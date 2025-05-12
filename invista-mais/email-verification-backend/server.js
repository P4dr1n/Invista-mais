require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/auth', authRoutes);
app.use('/verificacao', verificationRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});