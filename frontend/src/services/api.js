import axios from 'axios';

const api = axios.create({
  baseURL: 'https://valoriza-app-production.up.railway.app'
});

// Este "Interceptor" coloca o Token em todas as chamadas automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
