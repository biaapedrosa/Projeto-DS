import { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const salvo = localStorage.getItem('nutriflow:user');
    return salvo ? JSON.parse(salvo) : null;
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Persiste o usuário E o token. O token é lido pelo interceptor do axios
  // (api.js) para montar o header Authorization em toda chamada autenticada.
  const persist = (data) => {
    if (data.token) localStorage.setItem('token', data.token);
    localStorage.setItem('nutriflow:user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const login = async (dados) => persist(await authService.login(dados));

  const loginSocial = async (dados) => persist(await authService.socialLogin(dados));

  const ativarConta = async (dados) => persist(await authService.ativarConta(dados));

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, loginSocial, ativarConta, logout, showLoginModal, setShowLoginModal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
