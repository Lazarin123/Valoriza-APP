import axios from 'axios';

const api = axios.create({
  baseURL: 'https://valorizaapp-backend.onrender.com'
});

// Isso adiciona o token automaticamente em TODAS as chamadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
