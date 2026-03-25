require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middlewares
app.use(cors()); // Permite requisições do seu frontend React
app.use(express.json()); // Permite ler o body em JSON

// Configuração das Rotas
app.use('/api/payments', paymentRoutes);

// Rota de saúde da API
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API do Valoriza App operando normalmente.' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
