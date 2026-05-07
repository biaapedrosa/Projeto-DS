import api from './api';

const register = async (dados) => {
  const response = await api.post('/api/auth/register', dados);
  return response.data;
};

const login = async (dados) => {
  const response = await api.post('/api/auth/login', dados);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };