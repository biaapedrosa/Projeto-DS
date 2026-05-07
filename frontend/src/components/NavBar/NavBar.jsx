import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C7 2 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7 19.8 9.4 21 12 21s5-1.2 6.4-2.6C20 16.8 21 14.5 21 12c0-5-4-10-9-10z" fill="#4CAF7D"/>
            <path d="M12 2c0 0-2 4-2 8s2 8 2 8" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 8c-3 0-5 1.5-5 4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 12c3 0 5-1.5 5-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>NutriFlow</span>
        </Link>

        {/* Links — mudam dependendo se está logado ou não */}
        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {user ? (
            // Logado: mostra links internos e botão sair
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/noticias" onClick={() => setMenuOpen(false)}>Notícias</Link>
              <Link to="/historico" onClick={() => setMenuOpen(false)}>Histórico</Link>
              <button className="btn-sair" onClick={handleLogout}>Sair</button>
            </>
          ) : (
            // Deslogado: mostra links públicos e botão entrar
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
              <Link to="/institucional" onClick={() => setMenuOpen(false)}>Sobre</Link>
              <Link to="/noticias" onClick={() => setMenuOpen(false)}>Notícias</Link>
              <button className="btn-entrar" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                Entrar
              </button>
            </>
          )}
        </nav>

        {/* Hambúrguer mobile */}
        <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
};

export default NavBar;