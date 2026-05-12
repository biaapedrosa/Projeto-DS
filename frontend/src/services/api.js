// Importa o axios — biblioteca que facilita fazer requisições HTTP (GET, POST, PUT, DELETE)
// É uma alternativa ao fetch nativo do browser, com mais recursos e sintaxe mais limpa
import axios from 'axios';

// Cria uma instância configurada do axios
// baseURL define o endereço base da API — todas as requisições vão usar esse prefixo
// Ex: api.get('/api/noticias') vai na verdade chamar http://localhost:3001/api/noticias
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Interceptor de requisição — é executado automaticamente antes de CADA chamada à API
// Aqui usamos para adicionar o token JWT no cabeçalho de autorização automaticamente,
// assim não precisamos adicionar manualmente em cada chamada de service
api.interceptors.request.use((config) => {
  // Busca o token salvo no localStorage (colocado lá durante o login)
  const token = localStorage.getItem('token');

  if (token) {
    // Adiciona o token no cabeçalho Authorization no formato "Bearer <token>"
    // O backend verifica esse cabeçalho no middleware de autenticação
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Retorna a config modificada para o axios continuar com a requisição
  return config;
});

// Exporta a instância configurada para ser usada nos services do frontend
export default api;
