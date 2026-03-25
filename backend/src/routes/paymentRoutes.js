const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rota para processar pagamento via Cartão de Crédito
router.post('/credit-card', paymentController.processCreditCard);

// Rota para gerar a cobrança via PIX
router.post('/pix', paymentController.generatePix);

module.exports = router;
