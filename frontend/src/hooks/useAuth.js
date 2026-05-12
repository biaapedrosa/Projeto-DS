// Importa o useContext do React — ele é o que permite "consumir" um contexto criado com createContext
import { useContext } from 'react';

// Importa o AuthContext que contém os dados de autenticação (user, login, logout)
import AuthContext from '../context/AuthContext';

// Hook personalizado que simplifica o acesso ao contexto de autenticação
// Em vez de escrever useContext(AuthContext) em cada componente,
// basta importar este hook e chamar useAuth()
const useAuth = () => useContext(AuthContext);

// Exporta o hook para ser usado nos componentes que precisam saber sobre o login
export default useAuth;
