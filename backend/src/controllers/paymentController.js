const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  // 1. Processamento de Cartão de Crédito
  async processCreditCard(req, res) {
    try {
      const { number, name, expiry, cvv, planId } = req.body;

      // NOTA: Em produção, você NUNCA envia os dados puros do cartão para o backend.
      // O frontend usa o SDK do Stripe para gerar um "PaymentMethod ID" ou "Token" 
      // e envia apenas esse Token para o backend.
      const { paymentMethodId } = req.body; // Supondo que o React enviou o Token seguro

      // Cria a intenção de pagamento (Subscription ou cobrança única)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 4990, // R$ 49,90 em centavos
        currency: 'brl',
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        },
        description: 'Assinatura Plano PRO - Valoriza App',
      });

      return res.status(200).json({
        success: true,
        message: 'Pagamento processado com sucesso!',
        paymentIntent
      });

    } catch (error) {
      console.error('Erro no pagamento via cartão:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar cartão de crédito.',
        error: error.message
      });
    }
  },

  // 2. Geração do PIX (QR Code e Copia e Cola)
  async generatePix(req, res) {
    try {
      // O Stripe gera um PaymentIntent especificando 'pix' como método
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 4990, 
        currency: 'brl',
        payment_method_types: ['pix'],
        description: 'Assinatura Plano PRO - Valoriza App',
      });

      // O Stripe retorna a string do Pix e a URL para gerar o QR Code visual
      const pixCode = paymentIntent.next_action.pix_display_qr_code.data;
      const qrCodeUrl = paymentIntent.next_action.pix_display_qr_code.image_url_png;

      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        pixInfo: {
          qrCodeUrl: qrCodeUrl,
          copyAndPaste: pixCode
        }
      });

    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao gerar cobrança PIX.',
        error: error.message
      });
    }
  }
};

module.exports = paymentController;
