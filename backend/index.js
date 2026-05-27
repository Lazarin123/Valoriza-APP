const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importe suas rotas aqui
const gastosRoutes = require('./routes/gastos');
app.use('/api/gastos', gastosRoutes);

// Teste rápido: adiciona essa rota temporária
app.get('/api/test', (req, res) => {
    res.json({ message: "Back-end funcionando!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
