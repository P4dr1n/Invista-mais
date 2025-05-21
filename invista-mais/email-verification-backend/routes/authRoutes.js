const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas públicas
router.post('/cadastro', authController.cadastro);
router.post('/login', authController.login);
router.post('/redefinir-senha', authController.redefinirSenha);

// Rotas protegidas
router.post('/custo-vida', authController.cadastrarCustoVida);
router.post('/perfil-investimento', authController.authMiddleware, authController.criarPerfilInvestimento);

module.exports = router;