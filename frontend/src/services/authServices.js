import api from './api';

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials), // Ajuste a rota se necessário
  cadastro: (dados) => api.post('/api/auth/register', dados),
};
