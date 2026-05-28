// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Importação e Registro da rota
// const gastosRoutes = require('./routes/gastos');
// app.use('/api/gastos', gastosRoutes); 

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));

const express = require('express');
const cors = require('cors');
const app = express();

// Configuração robusta do CORS para evitar bloqueios de preflight
app.use(cors({
  origin: '*', // Permite origens de qualquer site
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Adiciona o tratamento explícito para o método OPTIONS (preflight)
app.options('*', cors());

app.use(express.json());

// Importação e Registro das rotas
const gastosRoutes = require('./routes/gastos');
app.use('/api/gastos', gastosRoutes); 

// Rota de teste simples para verificar se o servidor está ativo
app.get('/', (req, res) => {
    res.json({ message: "API do Valoriza-APP rodando com sucesso!" });
});

// A porta deve ser process.env.PORT e o host '0.0.0.0' para o Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
