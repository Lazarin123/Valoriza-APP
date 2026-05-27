import api from './api';

export const investmentService = {
  listar: () => api.get('/api/investments'),
  adicionar: (dados) => api.post('/api/investments', dados)
};
