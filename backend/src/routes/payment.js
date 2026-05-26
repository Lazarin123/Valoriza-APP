const express = require('express');
const axios   = require('axios');
const db      = require('../config/db');
const authJWT = require('../middlewares/authJWT');

const router = express.Router();

// URLs da API PagSeguro
const PAGSEGURO_BASE = {
  sandbox:    'https://sandbox.api.pagseguro.com',
  production: 'https://api.pagseguro.com',
};

function getPagSeguroURL() {
  const env = process.env.PAGSEGURO_ENV || 'sandbox';
  return PAGSEGURO_BASE[env] || PAGSEGURO_BASE.sandbox;
}

function getPagSeguroHeaders() {
  return {
    Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

// ─────────────────────────────────────────
//  POST /api/payment/checkout
//  Cria um pedido no PagSeguro e retorna o link de pagamento
// ─────────────────────────────────────────
router.post('/checkout', authJWT, async (req, res) => {
  const { payment_method } = req.body;
  // payment_method: 'PIX' | 'CREDIT_CARD' | 'BOLETO'

  const allowedMethods = ['PIX', 'CREDIT_CARD', 'BOLETO'];
  if (!payment_method || !allowedMethods.includes(payment_method.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: `Método de pagamento inválido. Use: ${allowedMethods.join(', ')}`,
    });
  }

  // Verifica se o usuário já tem plano ativo
  try {
    const [rows] = await db.query(
      'SELECT plan, plan_expires_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    if (
      rows[0].plan === 'monthly' &&
      rows[0].plan_expires_at &&
      new Date(rows[0].plan_expires_at) > new Date()
    ) {
      return res.status(409).json({
        success: false,
        message: 'Você já possui um plano ativo.',
        plan_expires_at: rows[0].plan_expires_at,
      });
    }

  } catch (err) {
    console.error('Erro ao verificar plano:', err);
    return res.status(500).json({ success: false, message: 'Erro interno.' });
  }

  const amountInCents = parseInt(process.env.PLAN_MONTHLY_PRICE) || 2990; // R$ 29,90

  // Monta o payload para o PagSeguro
  const orderPayload = {
    reference_id: `valoriza_user_${req.user.id}_${Date.now()}`,
    customer: {
      name:  req.user.name,
      email: req.user.email,
    },
    items: [
      {
        name:      process.env.PLAN_MONTHLY_NAME || 'Valoriza Mensal',
        quantity:  1,
        unit_amount: amountInCents,
      },
    ],
    notification_urls: [
      `${process.env.APP_URL}/api/payment/webhook`,
    ],
    charges: [
      {
        reference_id:    `charge_${req.user.id}_${Date.now()}`,
        description:     'Plano Mensal Valoriza',
        amount: {
          value:    amountInCents,
          currency: 'BRL',
        },
        payment_method: {
          type: payment_method.toUpperCase(),
          ...(payment_method.toUpperCase() === 'CREDIT_CARD' && {
            installments:    1,
            capture:         true,
            soft_descriptor: 'VALORIZA APP',
          }),
        },
      },
    ],
  };

  try {
    const { data: order } = await axios.post(
      `${getPagSeguroURL()}/orders`,
      orderPayload,
      { headers: getPagSeguroHeaders() }
    );

    // Salva o pedido no banco com status WAITING
    await db.query(
      `INSERT INTO payments (user_id, pagseguro_order_id, plan, amount, status)
       VALUES (?, ?, 'monthly', ?, 'WAITING')`,
      [req.user.id, order.id, (amountInCents / 100).toFixed(2)]
    );

    // Monta resposta com dados relevantes por método
    const charge = order.charges?.[0];
    const responseData = {
      success:  true,
      order_id: order.id,
      status:   order.status,
      amount:   `R$ ${(amountInCents / 100).toFixed(2).replace('.', ',')}`,
    };

    if (payment_method.toUpperCase() === 'PIX') {
      responseData.pix = {
        qr_code:      charge?.payment_response?.raw_data?.qr_code,
        qr_code_text: charge?.payment_response?.raw_data?.qr_code_text,
        expiration:   charge?.payment_response?.raw_data?.expiration_date,
      };
    }

    if (payment_method.toUpperCase() === 'BOLETO') {
      responseData.boleto = {
        barcode:  charge?.payment_response?.raw_data?.formatted_barcode,
        pdf_url:  charge?.links?.find(l => l.rel === 'pdf')?.href,
        due_date: charge?.payment_response?.raw_data?.due_date,
      };
    }

    if (payment_method.toUpperCase() === 'CREDIT_CARD') {
      responseData.credit_card = {
        status:  charge?.status,
        message: charge?.payment_response?.message,
      };
    }

    return res.status(201).json(responseData);

  } catch (err) {
    const errorDetail = err.response?.data;
    console.error('Erro PagSeguro /orders:', errorDetail || err.message);

    return res.status(502).json({
      success: false,
      message: 'Erro ao criar pedido no PagSeguro.',
      detail:  errorDetail?.error_messages || errorDetail || err.message,
    });
  }
});

// ─────────────────────────────────────────
//  POST /api/payment/webhook
//  Recebe notificações do PagSeguro (não requer autenticação JWT)
// ─────────────────────────────────────────
router.post('/webhook', async (req, res) => {
  const event = req.body;

  // PagSeguro envia eventos no formato: { id, type, created_at, data: { id, ... } }
  if (!event || !event.data?.id) {
    return res.status(400).json({ success: false, message: 'Payload inválido.' });
  }

  const orderId = event.data.id;
  const eventType = event.type; // ex: 'CHARGE_PAID', 'CHARGE_DECLINED'

  console.log(`📩 Webhook PagSeguro | Evento: ${eventType} | Order: ${orderId}`);

  try {
    // Confirma o pedido diretamente na API PagSeguro (evita spoofing)
    const { data: order } = await axios.get(
      `${getPagSeguroURL()}/orders/${orderId}`,
      { headers: getPagSeguroHeaders() }
    );

    // Busca o pagamento no banco
    const [payments] = await db.query(
      'SELECT * FROM payments WHERE pagseguro_order_id = ?',
      [orderId]
    );

    if (!payments.length) {
      console.warn(`⚠️ Pedido ${orderId} não encontrado no banco.`);
      return res.status(200).json({ received: true }); // Retorna 200 para o PagSeguro não reenviar
    }

    const payment = payments[0];
    const chargeStatus = order.charges?.[0]?.status || order.status;

    // Mapeia status do PagSeguro para nosso banco
    const statusMap = {
      PAID:      'PAID',
      DECLINED:  'DECLINED',
      CANCELLED: 'CANCELLED',
      REFUNDED:  'REFUNDED',
    };

    const newStatus = statusMap[chargeStatus] || payment.status;

    if (newStatus === 'PAID' && payment.status !== 'PAID') {
      // Calcula validade do plano (30 dias a partir de hoje)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Atualiza o pagamento
      await db.query(
        "UPDATE payments SET status = 'PAID', paid_at = NOW() WHERE id = ?",
        [payment.id]
      );

      // Ativa o plano do usuário
      await db.query(
        "UPDATE users SET plan = 'monthly', plan_expires_at = ? WHERE id = ?",
        [expiresAt, payment.user_id]
      );

      console.log(`✅ Plano mensal ativado para user_id ${payment.user_id} até ${expiresAt.toISOString()}`);

    } else if (['DECLINED', 'CANCELLED', 'REFUNDED'].includes(newStatus)) {
      await db.query(
        'UPDATE payments SET status = ? WHERE id = ?',
        [newStatus, payment.id]
      );

      // Se reembolsado, volta para free
      if (newStatus === 'REFUNDED') {
        await db.query(
          "UPDATE users SET plan = 'free', plan_expires_at = NULL WHERE id = ?",
          [payment.user_id]
        );
        console.log(`🔄 Plano rebaixado para free (reembolso) — user_id ${payment.user_id}`);
      }
    }

    // Sempre retorna 200 para o PagSeguro confirmar o recebimento
    res.status(200).json({ received: true });

  } catch (err) {
    console.error('Erro no webhook:', err.message);
    res.status(500).json({ success: false, message: 'Erro ao processar webhook.' });
  }
});

// ─────────────────────────────────────────
//  GET /api/payment/history
//  Histórico de pagamentos do usuário logado
// ─────────────────────────────────────────
router.get('/history', authJWT, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, plan, amount, status, paid_at, created_at
       FROM payments
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      payments: rows.map(p => ({
        id:         p.id,
        plan:       p.plan,
        amount:     `R$ ${parseFloat(p.amount).toFixed(2).replace('.', ',')}`,
        status:     p.status,
        paid_at:    p.paid_at,
        created_at: p.created_at,
      })),
    });

  } catch (err) {
    console.error('Erro em /history:', err);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
});

module.exports = router;
