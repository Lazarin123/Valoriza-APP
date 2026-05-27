const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT');
const db = require('../config/db');

// Rota: GET /api/gastos/fixos
router.get('/fixos', authJWT, async (req, res) => {
  try {
    // req.user.id é extraído automaticamente do token pelo authJWT
    const [rows] = await db.query('SELECT * FROM gastos_fixos WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar gastos fixos" });
  }
});

// Rota: POST /api/gastos/fixos (Para salvar um novo)
router.post('/fixos', authJWT, async (req, res) => {
  const { nome, valor, dia } = req.body;
  try {
    await db.query(
      'INSERT INTO gastos_fixos (user_id, nome, valor, dia) VALUES (?, ?, ?, ?)',
      [req.user.id, nome, valor, dia]
    );
    res.status(201).json({ message: "Salvo com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir no banco" });
  }
});

module.exports = router;
