import { createContext, useState, useContext } from 'react';
import authService from '../services/authService';
import { makeDemoToken } from '../services/mockApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const salvo = localStorage.getItem('nutriflow:user');
    return salvo ? JSON.parse(salvo) : null;
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = async (dados) => {
    const data = await authService.login(dados);
    setUser(data);
    localStorage.setItem('nutriflow:user', JSON.stringify(data));
    return data;
  };

  // Login de demonstração - ser substituído quando for feita a integração
  const loginDemo = (tipo = 'paciente') => {
    const token = makeDemoToken(tipo);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const data = { token, ...payload };
    localStorage.setItem('token', token);
    localStorage.setItem('nutriflow:user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('nutriflow:user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginDemo, logout, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;