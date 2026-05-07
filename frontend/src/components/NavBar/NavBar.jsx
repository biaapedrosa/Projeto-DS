import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  const active = (path) => pathname === path ? styles.linkActive : {};

  return (
    <nav style={styles.nav}>
      <Link to="/institucional" style={styles.brand}>
        <span style={styles.leaf}>🌿</span>
        <span>NutriClin</span>
      </Link>

      <div style={styles.links}>
        <Link to="/institucional" style={{ ...styles.link, ...active('/institucional') }}>Início</Link>
        <Link to="/noticias" style={{ ...styles.link, ...active('/noticias') }}>Notícias</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={{ ...styles.link, ...active('/dashboard') }}>Meu Plano</Link>
            <Link to="/historico" style={{ ...styles.link, ...active('/historico') }}>Histórico</Link>
            <div style={styles.userChip}>
              <span style={styles.avatar}>{user.nome[0].toUpperCase()}</span>
              <span style={styles.userName}>{user.nome.split(' ')[0]}</span>
            </div>
            <button onClick={handleLogout} style={styles.btnLogout}>Sair</button>
          </>
        ) : (
          <Link to="/login">
            <button style={styles.btnLogin}>Entrar</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 40px', height: '64px',
    background: 'var(--green-primary)',
    boxShadow: '0 2px 8px rgba(0,0,0,.2)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: '8px',
    color: '#fff', fontSize: '20px', fontWeight: '700', letterSpacing: '.5px',
  },
  leaf: { fontSize: '22px' },
  links: { display: 'flex', alignItems: 'center', gap: '8px' },
  link: {
    color: 'rgba(255,255,255,.85)', padding: '6px 12px',
    borderRadius: '6px', fontSize: '14px', fontWeight: '500',
    transition: 'background .2s',
  },
  linkActive: { background: 'rgba(255,255,255,.15)', color: '#fff' },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,.15)', borderRadius: '20px', padding: '4px 12px 4px 4px',
    marginLeft: '8px',
  },
  avatar: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'var(--green-pale)', color: 'var(--green-dark)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '13px',
  },
  userName: { color: '#fff', fontSize: '13px', fontWeight: '500' },
  btnLogin: {
    background: '#fff', color: 'var(--green-primary)',
    border: 'none', borderRadius: '6px', padding: '8px 20px',
    fontWeight: '600', fontSize: '14px',
  },
  btnLogout: {
    background: 'transparent', border: '1px solid rgba(255,255,255,.5)',
    color: '#fff', borderRadius: '6px', padding: '6px 14px', fontSize: '13px',
  },
};
