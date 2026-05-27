// const express    = require('express');
// const authJWT    = require('../middlewares/authJWT');
// const checkPlan  = require('../middlewares/checkPlan');

// const router = express.Router();

// // Todas as rotas aqui usam authJWT + checkPlan
// // → Só usuários com plano mensal ativo chegam nelas

// // ─────────────────────────────────────────
// //  GET /api/investments/status
// //  Retorna se o campo de investimentos está disponível
// //  (pode ser chamado pelo front para saber o que exibir)
// // ─────────────────────────────────────────
// router.get('/status', authJWT, async (req, res) => {
//   // Importa o db apenas aqui para buscar dados frescos
//   const db = require('../config/db');

//   try {
//     const [rows] = await db.query(
//       'SELECT plan, plan_expires_at FROM users WHERE id = ?',
//       [req.user.id]
//     );

//     if (!rows.length) {
//       return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
//     }

//     const { plan, plan_expires_at } = rows[0];
//     const isActive =
//       plan === 'monthly' &&
//       (!plan_expires_at || new Date(plan_expires_at) > new Date());

//     res.json({
//       success: true,
//       has_investments: isActive,
//       plan,
//       plan_expires_at: plan_expires_at || null,
//       // O front usa este campo para mostrar ou esconder o campo de investimentos
//       show_investments_field: isActive,
//     });

//   } catch (err) {
//     console.error('Erro em /investments/status:', err);
//     res.status(500).json({ success: false, message: 'Erro interno.' });
//   }
// });

// // ─────────────────────────────────────────
// //  GET /api/investments
// //  Lista os investimentos do usuário
// //  🔒 Requer plano pago
// // ─────────────────────────────────────────
// router.get('/', authJWT, checkPlan, (req, res) => {
//   // Aqui você futuramente conecta com sua tabela de investimentos
//   // Por enquanto retorna dados de exemplo
//   res.json({
//     success: true,
//     message: 'Área de investimentos liberada!',
//     user:    req.user.name,
//     investments: [
//       // Substitua isto pela sua query real:
//       // const [rows] = await db.query('SELECT * FROM investments WHERE user_id = ?', [req.user.id]);
//       { id: 1, name: 'Tesouro Direto',   type: 'Renda Fixa',  value: 1500.00, yield: '10,5% a.a.' },
//       { id: 2, name: 'PETR4',            type: 'Ações',       value: 800.00,  yield: '+12% no mês' },
//       { id: 3, name: 'Fundo Imobiliário', type: 'FII',        value: 2200.00, yield: '0,8% a.m.'  },
//     ],
//   });
// });

// // ─────────────────────────────────────────
// //  POST /api/investments
// //  Adiciona um investimento
// //  🔒 Requer plano pago
// // ─────────────────────────────────────────
// router.post('/', authJWT, checkPlan, async (req, res) => {
//   const { name, type, value } = req.body;

//   if (!name || !type || !value) {
//     return res.status(400).json({
//       success: false,
//       message: 'Campos obrigatórios: name, type, value',
//     });
//   }

//   // TODO: Inserir na sua tabela de investimentos
//   // const db = require('../config/db');
//   // await db.query('INSERT INTO investments (user_id, name, type, value) VALUES (?, ?, ?, ?)',
//   //   [req.user.id, name, type, value]);

//   res.status(201).json({
//     success: true,
//     message: 'Investimento adicionado com sucesso!',
//     investment: { name, type, value, user_id: req.user.id },
//   });
// });

// module.exports = router;

const express    = require('express');
const authJWT    = require('../middlewares/authJWT');
const checkPlan  = require('../middlewares/checkPlan');
const db         = require('../config/db'); // Importação correta no topo

const router = express.Router();

// ─────────────────────────────────────────
// GET /api/investments/status
// ─────────────────────────────────────────
router.get('/status', authJWT, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT plan, plan_expires_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const { plan, plan_expires_at } = rows[0];
    const isActive =
      plan === 'monthly' &&
      (!plan_expires_at || new Date(plan_expires_at) > new Date());

    res.json({
      success: true,
      has_investments: isActive,
      plan,
      plan_expires_at: plan_expires_at || null,
      show_investments_field: isActive,
    });
  } catch (err) {
    console.error('Erro em /investments/status:', err);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
});

// ─────────────────────────────────────────
// GET /api/investments
// Lista investimentos APENAS do usuário logado
// ─────────────────────────────────────────
router.get('/', authJWT, checkPlan, async (req, res) => {
  try {
    const [investments] = await db.query(
      'SELECT id, name, type, value, yield FROM investments WHERE user_id = ?',
      [req.user.id] // Filtro de segurança: cada um vê apenas o seu
    );
    res.json({ success: true, investments });
  } catch (err) {
    console.error('Erro em GET /investments:', err);
    res.status(500).json({ success: false, message: 'Erro ao buscar investimentos.' });
  }
});

// ─────────────────────────────────────────
// POST /api/investments
// Adiciona investimento vinculado ao usuário logado
// ─────────────────────────────────────────
router.post('/', authJWT, checkPlan, async (req, res) => {
  const { name, type, value, yield: yieldValue } = req.body;

  if (!name || !type || !value) {
    return res.status(400).json({
      success: false,
      message: 'Campos obrigatórios: name, type, value',
    });
  }

  try {
    await db.query(
      'INSERT INTO investments (user_id, name, type, value, yield) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, type, value, yieldValue || 'N/A']
    );
    res.status(201).json({ success: true, message: 'Investimento salvo com sucesso!' });
  } catch (err) {
    console.error('Erro em POST /investments:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar investimento.' });
  }
});

module.exports = router;
