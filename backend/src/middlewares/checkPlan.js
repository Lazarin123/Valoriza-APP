const db = require('../config/db');

/**
 * Middleware: verifica se o usuário possui plano pago e ativo.
 * Deve ser usado DEPOIS do authJWT.
 * Bloqueia o acesso à área de investimentos para plano gratuito.
 */
async function checkPlan(req, res, next) {
  try {
    const [rows] = await db.query(
      'SELECT plan, plan_expires_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado.',
      });
    }

    const { plan, plan_expires_at } = rows[0];

    // Plano gratuito → bloqueia
    if (plan === 'free') {
      return res.status(403).json({
        success: false,
        message: 'Acesso restrito. Faça upgrade para o plano mensal para acessar os investimentos.',
        upgrade_required: true,
      });
    }

    // Plano pago → verifica se ainda está dentro da validade
    if (plan_expires_at && new Date(plan_expires_at) < new Date()) {
      // Plano expirado: rebaixa para free automaticamente
      await db.query(
        "UPDATE users SET plan = 'free', plan_expires_at = NULL WHERE id = ?",
        [req.user.id]
      );

      return res.status(403).json({
        success: false,
        message: 'Seu plano expirou. Renove para continuar acessando os investimentos.',
        upgrade_required: true,
      });
    }

    // Tudo certo, libera o acesso
    next();
  } catch (err) {
    console.error('Erro em checkPlan:', err);
    res.status(500).json({
      success: false,
      message: 'Erro interno ao verificar plano.',
    });
  }
}

module.exports = checkPlan;
