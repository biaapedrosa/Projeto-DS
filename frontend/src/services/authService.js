import api from './api';

const register = async (dados) => {
  const response = await api.post('/api/auth/register', dados);
  return response.data;
};

const login = async (dados) => {
  const response = await api.post('/api/auth/login', dados);
  const token = response.data.token;
  localStorage.setItem('token', token);

  // Decodifica o payload do JWT para pegar o id do usuário
  const payload = JSON.parse(atob(token.split('.')[1]));
  return { token, id: payload.id, email: payload.email };
};

const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };