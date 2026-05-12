// Importa a instância configurada do axios (com baseURL e interceptor de token)
import api from './api';

// Faz o cadastro de um novo paciente enviando os dados para a API
const register = async (dados) => {
  const response = await api.post('/api/auth/register', dados);
  return response.data; // retorna os dados da resposta (ex: { message, paciente })
};

// Faz o login enviando email e senha para a API
// Se bem-sucedido, salva o token JWT no localStorage para ser usado nas próximas requisições
const login = async (dados) => {
  const response = await api.post('/api/auth/login', dados);

  // Salva o token no localStorage — assim o interceptor do api.js vai encontrá-lo
  // nas próximas chamadas e adicioná-lo automaticamente ao cabeçalho Authorization
  localStorage.setItem('token', response.data.token);

  return response.data; // retorna { token }
};

// Faz o logout removendo o token do localStorage
// Como JWT é stateless, não precisamos avisar o servidor — basta apagar o token localmente
const logout = () => {
  localStorage.removeItem('token');
};

// Exporta as funções para serem usadas no AuthContext e nos componentes de login
export default { register, login, logout };
