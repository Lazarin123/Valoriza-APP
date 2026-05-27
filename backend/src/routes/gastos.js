const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT');
const db = require('../config/db');

// Rota GET: busca apenas gastos do usuário do token
router.get('/fixos', authJWT, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gastos_fixos WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar fixos" });
  }
});

// Rota POST: insere novo gasto fixo vinculado ao user_id
router.post('/fixos', authJWT, async (req, res) => {
  const { nome, valor, dia } = req.body;
  try {
    await db.query(
      'INSERT INTO gastos_fixos (user_id, nome, valor, dia) VALUES (?, ?, ?, ?)',
      [req.user.id, nome, valor, dia]
    );
    res.status(201).json({ message: "Gasto fixo adicionado!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar no banco" });
  }
});

// Repita a mesma lógica para gastos_variaveis se necessário
module.exports = router;
