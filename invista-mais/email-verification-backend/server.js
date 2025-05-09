require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configurações
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(express.json());
app.use(cors());

// Pool de conexões MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --------------------- Rotas ---------------------
// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, sobrenome, cpf, telefone, email, senha, ...endereco } = req.body;

    // Validação básica dos campos
    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({
        success: false,
        mensagem: 'Campos obrigatórios faltando'
      });
    }

    // Verificar se usuário já existe
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

    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Inserir usuário
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

    // Gerar código de verificação
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    await pool.query(
      'INSERT INTO codigos_verificacao (email, codigo) VALUES (?, ?)',
      [email, codigo]
    );

    // Enviar e-mail
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Verificação de E-mail',
      html: `
        <h2>Seu código de verificação:</h2>
        <h1>${codigo}</h1>
        <p>Válido por 10 minutos</p>
      `
    };

    await sgMail.send(msg);
    res.status(201).json({ success: true });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ 
      success: false,
      mensagem: 'Erro interno no servidor' 
    });
  }
});

// Login de usuário
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const [users] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        mensagem: 'Credenciais inválidas'
      });
    }

    const usuario = users[0];

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        mensagem: 'Credenciais inválidas'
      });
    }

    // Verificar se e-mail está confirmado
    if (!usuario.verificado) {
      return res.status(403).json({
        success: false,
        mensagem: 'Confirme seu e-mail antes de fazer login'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      mensagem: 'Erro interno no servidor'
    });
  }
});

// Solicitar código de verificação
app.post('/solicitar-codigo', async (req, res) => {
  try {
    const { email } = req.body;

    // Gerar novo código
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    await pool.query(
      'INSERT INTO codigos_verificacao (email, codigo) VALUES (?, ?)',
      [email, codigo]
    );

    // Enviar e-mail
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
});

// Verificar código
app.post('/verificar-codigo', async (req, res) => {
  try {
    const { email, codigo } = req.body;

    // Buscar código válido
    const [codigos] = await pool.query(
      `SELECT * FROM codigos_verificacao 
      WHERE email = ? 
      AND codigo = ? 
      AND expira_em > NOW() 
      AND utilizado = 0`,
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

    // Marcar usuário como verificado
    await pool.query(
      'UPDATE usuarios SET verificado = 1 WHERE email = ?',
      [email]
    );

    res.json({ success: true });

  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({
      success: false,
      mensagem: 'Erro na verificação'
    });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});