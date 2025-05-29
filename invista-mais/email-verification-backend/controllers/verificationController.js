// verificationController.js
const sgMail = require('@sendgrid/mail');
const pool = require('../config/db');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const enviarEmailCodigo = async (email, codigo) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Seu Código de Verificação',
      html: `<h1>${codigo}</h1>`
    };
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Erro no envio de email:', error);
    throw new Error('Falha no envio do email');
  }
};
exports.solicitarCodigo = async (req, res) => {
  try {
    const { email } = req.body;
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
      'INSERT INTO codigos_verificacao (email, codigo, expira_em) VALUES (?, ?, NOW() + INTERVAL 10 MINUTE)',
      [email, codigo]
    );

    // Enviar email usando a nova função
    await enviarEmailCodigo(email, codigo);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar código:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro ao enviar código',
      detalhes: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

exports.verificarCodigo = async (req, res) => {
  try {
    const { email, codigo } = req.body;
    
    // Adicione logs para depuração
    console.log(`Tentativa de verificação: ${email} - ${codigo}`);
    
    const [codigos] = await pool.query(
      `SELECT id 
       FROM codigos_verificacao 
       WHERE email = ? 
         AND codigo = ? 
         AND expira_em > NOW()
         AND usado = 0
       LIMIT 1`,
      [email, codigo]
    );

    console.log(`Resultado da query:`, codigos);

    if (codigos.length === 0) {
      console.log('Código inválido ou expirado');
      return res.status(400).json({
        success: false,
        mensagem: 'Código inválido ou expirado'
      });
    }

    // Marcar código como utilizado
    await pool.query(
      'UPDATE codigos_verificacao SET usado = 1 WHERE id = ?',
      [codigos[0].id]
    );

    // Verificar se é um e-mail de cadastro ou redefinição
    const [usuario] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuario.length > 0) {
      // Atualizar usuário como verificado apenas se for cadastro
      await pool.query(
        'UPDATE usuarios SET verificado = 1 WHERE email = ?',
        [email]
      );
      console.log(`Usuário ${email} verificado com sucesso`);
    }

    res.json({
      success: true,
      mensagem: 'Código verificado com sucesso'
    });

  } catch (error) {
    console.error('Erro na verificação:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      mensagem: 'Erro na verificação do código'
    });
  }
};