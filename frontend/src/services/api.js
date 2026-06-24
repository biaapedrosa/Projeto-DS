// Mock removido — todas as chamadas vão para o backend real.
// Em desenvolvimento certifique-se de que VITE_API_URL está definido no .env,
// ou que o backend está rodando em http://localhost:3001.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// Anexa o token JWT em toda requisição autenticada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trata erros globais de autenticação:
// 401 → token expirado ou ausente → redireciona para login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('nutriflow:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
