import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#4CAF50',
      color: 'white'
    }}>
      <h1 style={{ margin: 0 }}>Clínica de Nutrição</h1>
      <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
        Sair
      </button>
    </nav>
  );
};

export default NavBar;