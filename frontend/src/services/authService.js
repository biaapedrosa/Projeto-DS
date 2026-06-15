import api from './api';

const register = async (dados) => {
  const response = await api.post('/api/auth/register', dados);
  return response.data;
};

const login = async (dados) => {
  const response = await api.post('/api/auth/login', dados);
  const token = response.data.token;
  
  // Decodifica o payload do JWT para pegar o id do usuário
  const payload = JSON.parse(atob(token.split('.')[1]));
  return { token, id: payload.id, nome: payload.nome, email: payload.email, tipo: payload.tipo, role: payload.role };
};

const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };