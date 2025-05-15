// verificationController.js
const sgMail = require('@sendgrid/mail');
const pool = require('../config/db');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.solicitarCodigo = async (req, res) => {
  try {
    const { email } = req.body;
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
  'INSERT INTO codigos_verificacao (email, codigo, expira_em) VALUES (?, ?, NOW() + INTERVAL 10 MINUTE)', // Adicione o campo expira_em
  [email, codigo]
);

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Seu Código de Verificação',
      html: `<h1>${codigo}</h1>`
    };

    await sgMail.send(msg);
    res.json({ success: true });

  } catch (error) {
    console.error('Erro ao enviar código:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro ao enviar código' 
    });
  }
};

exports.verificarCodigo = async (req, res) => {
  try {
    const { email, codigo } = req.body;

    // Buscar código válido
    const [codigos] = await pool.query(
      `SELECT id 
       FROM codigos_verificacao 
       WHERE email = ? 
         AND codigo = ? 
         AND expira_em > NOW() 
         AND utilizado = 0
       LIMIT 1`,
      [email, codigo]
    );

    if (codigos.length === 0) {
      return res.status(400).json({
        success: false,
        mensagem: 'Código inválido ou expirado'
      });
    }

    // Marcar código como utilizado
    await pool.query(
      'UPDATE codigos_verificacao SET utilizado = 1 WHERE id = ?',
      [codigos[0].id]
    );

    // Atualizar usuário como verificado
    await pool.query(
      'UPDATE usuarios SET verificado = 1 WHERE email = ?',
      [email]
    );

    res.json({
      success: true,
      mensagem: 'E-mail verificado com sucesso'
    });

  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({
      success: false,
      mensagem: 'Erro na verificação do código'
    });
  }
};