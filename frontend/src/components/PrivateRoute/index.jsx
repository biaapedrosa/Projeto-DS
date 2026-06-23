import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute({ children, perfil }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login', { replace: true }); return; }
    if (perfil && user.tipo !== perfil) { navigate('/', { replace: true }); }
  }, [user]);

  if (!user) return null;
  if (perfil && user.tipo !== perfil) return null;
  return children;
}