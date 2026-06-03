import { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const salvo = localStorage.getItem('nutriflow:user');
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = async (dados) => {
    const data = await authService.login(dados);
    setUser(data);
    localStorage.setItem('nutriflow:user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('nutriflow:user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
