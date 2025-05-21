const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// Função compartilhada para envio de e-mail de verificação
const enviarCodigoVerificacao = async (email) => {
  try {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    
    await pool.query(
      `INSERT INTO codigos_verificacao 
      (email, codigo, expira_em) 
      VALUES (?, ?, NOW() + INTERVAL 10 MINUTE)`,
      [email, codigo]
    );

    // Aqui iria a lógica de envio de e-mail com SendGrid ou outro serviço
    console.log(`Código de verificação para ${email}: ${codigo}`);
    
    return true;
  } catch (error) {
    console.error('Erro ao enviar código:', error);
    throw new Error('Falha no envio do código de verificação');
  }
};

exports.cadastro = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { nome, sobrenome, cpf, telefone, email, senha, ...endereco } = req.body;

    // Validação de campos obrigatórios
    const camposObrigatorios = ['nome', 'sobrenome', 'cpf', 'telefone', 'email', 'senha'];
    const camposFaltando = camposObrigatorios.filter(campo => !req.body[campo]);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({
        success: false,
        mensagem: `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`
      });
    }

    // Verificar usuário existente
    const [existingUser] = await connection.query(
      'SELECT id FROM usuarios WHERE email = ? OR cpf = ?',
      [email, cpf.replace(/\D/g, '')]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        mensagem: 'E-mail ou CPF já cadastrado'
      });
    }

    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Inserir usuário
    const [usuarioResult] = await connection.query(
      `INSERT INTO usuarios 
      (nome, sobrenome, cpf, telefone, email, senha) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nome,
        sobrenome,
        cpf.replace(/\D/g, ''),
        telefone.replace(/\D/g, ''),
        email,
        hashedPassword
      ]
    );

    // Inserir endereço
    await connection.query(
      `INSERT INTO enderecos 
      (usuario_id, cep, endereco, numero, bairro, cidade, estado, mora_como) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuarioResult.insertId,
        endereco.cep.replace(/\D/g, ''),
        endereco.endereco,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.mora_como || 'Não informado'
      ]
    );

    // Enviar código de verificação
    await enviarCodigoVerificacao(email);

    await connection.commit();
    
    res.status(201).json({ 
      success: true,
      mensagem: 'Cadastro realizado com sucesso. Verifique seu e-mail.'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro no cadastro:', error);
    
    res.status(500).json({
      success: false,
      mensagem: error.message || 'Erro interno no servidor'
    });
  } finally {
    connection.release();
  }
};
exports.criarPerfilInvestimento = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { usuarioId, idade, rendaAnual, objetivo, horizonte, toleranciaRisco, conhecimento, liquidez, patrimonio } = req.body;

    // Validação básica
    if (!usuarioId || !idade || !rendaAnual || !objetivo || !horizonte || !toleranciaRisco || !conhecimento || !liquidez) {
      return res.status(400).json({
        success: false,
        mensagem: 'Campos obrigatórios faltando'
      });
    }

    // Verificar existência do usuário
    const [usuario] = await connection.query(
      'SELECT id FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        mensagem: 'Usuário não encontrado'
      });
    }

    // Inserir/Atualizar perfil
    const [result] = await connection.query(
      `INSERT INTO PerfilInvestimento (
        UsuarioID, Idade, RendaAnual, Objetivo, Horizonte,
        ToleranciaRisco, ConhecimentoInvestimentos, LiquidezNecessaria, ValorPatrimonio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        Idade = VALUES(Idade),
        RendaAnual = VALUES(RendaAnual),
        Objetivo = VALUES(Objetivo),
        Horizonte = VALUES(Horizonte),
        ToleranciaRisco = VALUES(ToleranciaRisco),
        ConhecimentoInvestimentos = VALUES(ConhecimentoInvestimentos),
        LiquidezNecessaria = VALUES(LiquidezNecessaria),
        ValorPatrimonio = VALUES(ValorPatrimonio)`,
      [usuarioId, idade, rendaAnual, objetivo, horizonte, toleranciaRisco, conhecimento, liquidez, patrimonio]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      mensagem: 'Perfil de investimento salvo com sucesso',
      perfilId: result.insertId
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro ao salvar perfil:', error);
    res.status(500).json({
      success: false,
      mensagem: 'Erro ao salvar perfil de investimento'
    });
  } finally {
    connection.release();
  }
};
// authController.js
exports.authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      mensagem: 'Autenticação falhou',
      detalhes: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};


// Cadastro de Custo de Vida
exports.cadastrarCustoVida = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const usuarioId = req.user.id;
    const { 
      Ano, 
      Regiao, 
      SalarioMedio, 
      Habitacao = null, 
      Alimentacao = null, 
      Transporte = null,
      EducacaoSaude = null, 
      Lazer = null, 
      Dividas = null, 
      PercentualMoradia = null, 
      Fonte = null 
    } = req.body;

    // Validação
    if (!Ano || !Regiao || !SalarioMedio) {
      return res.status(400).json({
        success: false,
        mensagem: 'Ano, Região e Salário são obrigatórios'
      });
    }

    // Inserção
    const [result] = await connection.query(
      `INSERT INTO CustoVidaClasseMedia (
        UsuarioID, Ano, Regiao, SalarioMedio,
        Habitacao, Alimentacao, Transporte,
        EducacaoSaude, Lazer, Dividas,
        PercentualMoradia, Fonte
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuarioId,
        Ano,
        Regiao,
        SalarioMedio,
        Habitacao,
        Alimentacao,
        Transporte,
        EducacaoSaude,
        Lazer,
        Dividas,
        PercentualMoradia,
        Fonte
      ]
    );

    await connection.commit();
    res.status(201).json({ 
      success: true,
      mensagem: 'Dados salvos com sucesso',
      id: result.insertId
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro no cadastro:', {
      code: error.code,
      sqlMessage: error.sqlMessage,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      mensagem: 'Erro interno no servidor'
    });
  } finally {
    connection.release();
  }
};

// Rota correspondent

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        mensagem: 'E-mail e senha são obrigatórios'
      });
    }

    // Buscar usuário
    const [users] = await pool.query(
      `SELECT 
        id, nome, email, senha, verificado 
       FROM usuarios 
       WHERE email = ?`,
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

    // Verificar e-mail confirmado
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
};

exports.redefinirSenha = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { email, novaSenha } = req.body;

    // Criptografar nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaSenha, salt);

    // Atualizar senha
    const [result] = await connection.query(
      'UPDATE usuarios SET senha = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        mensagem: 'Usuário não encontrado'
      });
    }

    await connection.commit();
    
    res.json({ 
      success: true,
      mensagem: 'Senha redefinida com sucesso'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Erro na redefinição:', error);
    
    res.status(500).json({
      success: false,
      mensagem: 'Erro ao redefinir senha'
    });
  } finally {
    connection.release();
  }
};