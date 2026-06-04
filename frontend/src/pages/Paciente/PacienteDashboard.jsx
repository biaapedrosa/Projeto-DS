import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PacienteDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1a1a1a' }}>Dashboard Paciente</h1>
          <p style={{ margin: '4px 0 0', color: '#888' }}>{user?.email}</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Sair
        </button>
      </div>
      <p style={{ color: '#555' }}>Área do paciente — em construção.</p>
    </div>
  );
}
