const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

router.post('/solicitar-codigo', verificationController.solicitarCodigo);
router.post('/verificar-codigo', verificationController.verificarCodigo);

module.exports = router;