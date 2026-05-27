const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT');
const db = require('../config/db');

// Rota para buscar APENAS os gastos do usuário logado
router.get('/fixos', authJWT, async (req, res) => {
  try {
    // req.user.id vem do token JWT, impossível outra pessoa acessar
    const [rows] = await db.query('SELECT * FROM gastos_fixos WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar gastos" });
  }
});

module.exports = router;
