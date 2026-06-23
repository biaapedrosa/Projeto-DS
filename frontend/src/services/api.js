import axios from 'axios';
import { resolveMock } from './mockApi';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && error.config) {
      const data = resolveMock(error.config);
      if (data !== undefined) {
        if (import.meta?.env?.DEV) {
          console.info(`[demo] ${error.config.method?.toUpperCase()} ${error.config.url} → resposta simulada`);
        }
        return Promise.resolve({ data, status: 200, statusText: 'OK (demo)', headers: {}, config: error.config });
      }
    }
    return Promise.reject(error);
  }
);

export default api;