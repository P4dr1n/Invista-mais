const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

exports.cadastro = async (req, res) => {
  try {
    const { nome, sobrenome, cpf, telefone, email, senha, ...endereco } = req.body;
    const verificationController = require('./verificationController');
    await verificationController.solicitarCodigo({ body: { email } }, res);

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({ success: false, mensagem: 'Campos obrigatórios faltando' });
    }

    const [existingUser] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? OR cpf = ?',
      [email, cpf]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        success: false,
        mensagem: 'Usuário já cadastrado com este e-mail ou CPF'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    

    await pool.query(
      `INSERT INTO usuarios 
      (nome, sobrenome, cpf, telefone, email, senha, cep, endereco, numero, bairro, cidade, estado, mora_como) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome, sobrenome, cpf, telefone, email, hashedPassword,
        endereco.cep, endereco.endereco, endereco.numero,
        endereco.bairro, endereco.cidade, endereco.estado, endereco.mora_como
      ]
    );

    res.status(201).json({ success: true });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro interno no servidor' 
    });
  }
};
exports.redefinirSenha = async (req, res) => {
  try {
    const { email, novaSenha } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);

    await pool.query(
      'UPDATE usuarios SET senha = ? WHERE email = ?',
      [hashedPassword, email]
    );

    res.json({ success: true });
    
  } catch (error) {
    console.error('Erro na redefinição:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro ao redefinir senha' 
    });
  }
};

exports.login = async (req, res) => {
  try {
   const { email, senha } = req.body;
    console.log('Tentativa de login com email:', email); // 👈 Log

    const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    console.log('Resultado da query:', users); // 👈 Log

    if (users.length === 0) {
      return res.status(401).json({ success: false, mensagem: 'Credenciais inválidas' });
    }

    const usuario = users[0];
    console.log('Usuário encontrado:', usuario); // 👈 Log

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha válida?', senhaValida); // 👈 Log
    
    if (!senhaValida) {
      return res.status(401).json({ success: false, mensagem: 'Credenciais inválidas' });
    }

    if (!usuario.verificado) {
      return res.status(403).json({ 
        success: false, 
        mensagem: 'Confirme seu e-mail antes de fazer login' 
      });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro interno no servidor' 
    });
  }
};