const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const db       = require('../config/db');
const authJWT  = require('../middlewares/authJWT');

const router = express.Router();

// ─────────────────────────────────────────
//  POST /api/auth/register  →  Cadastro
// ─────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validações básicas
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nome, e-mail e senha são obrigatórios.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'A senha deve ter pelo menos 6 caracteres.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Formato de e-mail inválido.',
    });
  }

  try {
    // Verifica se o e-mail já está cadastrado
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Este e-mail já está cadastrado.',
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insere o usuário (plano gratuito por padrão)
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, plan) VALUES (?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), hashedPassword, 'free']
    );

    const userId = result.insertId;

    // Gera token JWT
    const token = jwt.sign(
      { id: userId, name: name.trim(), email: email.toLowerCase().trim(), plan: 'free' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      token,
      user: {
        id:    userId,
        name:  name.trim(),
        email: email.toLowerCase().trim(),
        plan:  'free',
      },
    });

  } catch (err) {
    console.error('Erro em /register:', err);
    res.status(500).json({
      success: false,
      message: 'Erro interno no servidor.',
    });
  }
});

// ─────────────────────────────────────────
//  POST /api/auth/login  →  Login
// ─────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'E-mail e senha são obrigatórios.',
    });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, name, email, password, plan, plan_expires_at FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        message: 'E-mail ou senha incorretos.',
      });
    }

    const user = rows[0];

    // Compara a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'E-mail ou senha incorretos.',
      });
    }

    // Verifica se o plano pago expirou e rebaixa se necessário
    let currentPlan = user.plan;
    if (user.plan === 'monthly' && user.plan_expires_at && new Date(user.plan_expires_at) < new Date()) {
      await db.query(
        "UPDATE users SET plan = 'free', plan_expires_at = NULL WHERE id = ?",
        [user.id]
      );
      currentPlan = 'free';
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, plan: currentPlan },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        plan:  currentPlan,
      },
    });

  } catch (err) {
    console.error('Erro em /login:', err);
    res.status(500).json({
      success: false,
      message: 'Erro interno no servidor.',
    });
  }
});

// ─────────────────────────────────────────
//  GET /api/auth/me  →  Dados do usuário logado
// ─────────────────────────────────────────
router.get('/me', authJWT, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, plan, plan_expires_at, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const user = rows[0];

    res.json({
      success: true,
      user: {
        id:              user.id,
        name:            user.name,
        email:           user.email,
        plan:            user.plan,
        plan_expires_at: user.plan_expires_at,
        has_investments: user.plan === 'monthly',
        created_at:      user.created_at,
      },
    });

  } catch (err) {
    console.error('Erro em /me:', err);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
