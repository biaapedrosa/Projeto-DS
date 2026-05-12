// Importa as funções necessárias do React para criar o contexto de autenticação
// createContext: cria um "canal" de dados global que qualquer componente pode acessar
// useState: guarda o estado do usuário logado (null = deslogado)
// useContext: permite que componentes consumam os dados do contexto
import { createContext, useState, useContext } from 'react';

// Importa o serviço de autenticação do frontend, que faz as chamadas para a API
import authService from '../services/authService';

// Cria o contexto — é como uma "caixa" que vai guardar e distribuir os dados de autenticação
// Por enquanto está vazia; o valor real é definido no AuthProvider abaixo
const AuthContext = createContext();

// AuthProvider é o componente que "provê" os dados de autenticação para toda a aplicação
// Ele precisa envolver todos os componentes que precisam saber se o usuário está logado
export const AuthProvider = ({ children }) => {
  // Estado que guarda os dados do usuário logado (null quando não há ninguém logado)
  const [user, setUser] = useState(null);

  // Função de login — chama a API e salva os dados do usuário no estado
  const login = async (dados) => {
    const data = await authService.login(dados); // faz a requisição POST /api/auth/login
    setUser(data); // guarda a resposta (token) no estado global
    return data;
  };

  // Função de logout — limpa o token do localStorage e remove o usuário do estado
  const logout = () => {
    authService.logout(); // remove o token do localStorage
    setUser(null);        // reseta o estado, indicando que não há usuário logado
  };

  // O AuthContext.Provider distribui os valores { user, login, logout }
  // para todos os componentes filhos que usarem useContext(AuthContext) ou useAuth()
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de atalho — em vez de importar AuthContext e useContext separadamente,
// basta importar e chamar useAuth() para ter acesso ao contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Exporta o contexto caso algum componente precise importá-lo diretamente
export default AuthContext;
