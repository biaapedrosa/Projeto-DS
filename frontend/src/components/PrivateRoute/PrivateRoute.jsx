import {useAuth} from '../../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return ( 
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9', gap: '16px', textAlign: 'center', padding: '32px' }}>
        
        <Leaf size={48} color="#4CAF7D" />
        
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a3a2a', margin: 0 }}>
          Acesso restrito
        </h1>
        
        <p style={{ color: '#555', fontSize: '16px', maxWidth: '360px', margin: 0 }}>
          Você precisa estar logado para acessar esta página.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: '#2d6a4f', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/login?modo=cadastro')}
            style={{ background: 'white', color: '#2d6a4f', padding: '12px 24px', border: '1px solid #2d6a4f', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
          >
            Criar conta
          </button>
        </div>

      </div>
    );
  }

  return children;
}