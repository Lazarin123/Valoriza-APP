require('dotenv').config();
const express     = require('express');
const cors        = require('cors');

// Rotas
const authRoutes        = require('./routes/auth');
const paymentRoutes     = require('./routes/payment');
const investmentRoutes  = require('./routes/investments');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globais ───────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rotas ────────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/payment',     paymentRoutes);
app.use('/api/investments', investmentRoutes);

// ─── Health check (Render usa para saber se o serviço está vivo) ──
app.get('/health', (req, res) => {
  res.json({
    status:  'ok',
    app:     'Valoriza API',
    version: '1.0.0',
    time:    new Date().toISOString(),
  });
});

// ─── Rota não encontrada ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota ${req.method} ${req.path} não encontrada.`,
  });
});

// ─── Erro global ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno no servidor.',
  });
});

// ─── Inicia o servidor ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Valoriza API rodando na porta ${PORT}`);
  console.log(`📋 Ambiente PagSeguro: ${process.env.PAGSEGURO_ENV || 'sandbox'}`);
});
