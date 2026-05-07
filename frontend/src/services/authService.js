import api from './api';

export const login = async (email, senha) => {
  const { data } = await api.post('/auth/login', { email, senha });
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const register = async (nome, email, senha) => {
  const { data } = await api.post('/auth/register', { nome, email, senha });
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
