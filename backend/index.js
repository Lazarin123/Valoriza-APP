const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importação e Registro da rota
const gastosRoutes = require('./routes/gastos');
app.use('/api/gastos', gastosRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
