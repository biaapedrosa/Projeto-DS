import { createContext, useState } from 'react';
import { login as loginService, logout as logoutService, getUser } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser);

  const login = async (email, senha) => {
    const data = await loginService(email, senha);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
