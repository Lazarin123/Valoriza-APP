import api from './api';

export const paymentService = {
  // 1. Iniciar checkout (PIX, BOLETO, ou CREDIT_CARD)
  // Exemplo de chamada: checkout({ payment_method: 'PIX' })
  checkout: (dados) => api.post('/api/payment/checkout', dados),

  // 2. Buscar histórico de pagamentos do usuário logado
  listarHistorico: () => api.get('/api/payment/history')
};
