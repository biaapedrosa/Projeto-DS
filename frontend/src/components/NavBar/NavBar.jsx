import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../services/authService';
import './NavBar.css';

const NavBar = () => {
  const { logout, user, login } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await login(form);
      setModalAberto(false);
      setForm({ email: '', senha: '' });
      navigate('/dashboard');
    } catch (err) {
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <>
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

          {/* Links */}
          <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/noticias" onClick={() => setMenuOpen(false)}>Notícias</Link>
                <Link to="/historico" onClick={() => setMenuOpen(false)}>Histórico</Link>
                <button className="btn-sair" onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
                <Link to="/institucional" onClick={() => setMenuOpen(false)}>Sobre</Link>
                <Link to="/noticias" onClick={() => setMenuOpen(false)}>Notícias</Link>
                <button className="btn-entrar" onClick={() => { setModalAberto(true); setMenuOpen(false); }}>
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

      {/* Modal de Login */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', position: 'relative' }}>

            {/* Botão fechar */}
            <button onClick={() => { setModalAberto(false); setErro(''); }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>×</button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C7 2 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7 19.8 9.4 21 12 21s5-1.2 6.4-2.6C20 16.8 21 14.5 21 12c0-5-4-10-9-10z" fill="#4CAF7D"/>
                  <path d="M12 2c0 0-2 4-2 8s2 8 2 8" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 8c-3 0-5 1.5-5 4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 12c3 0 5-1.5 5-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>NutriFlow</span>
              </div>
              <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>Bem-vindo de volta!</h2>
              <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Entre com suas credenciais para acessar a plataforma</p>
            </div>

            {erro && (
              <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                {erro}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontSize: '14px', fontWeight: '500' }}>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontSize: '14px', fontWeight: '500' }}>Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                Entrar
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#555' }}>
              Não tem conta?{' '}
              <span onClick={() => { setModalAberto(false); navigate('/login?modo=cadastro'); }} style={{ color: '#2d7a4f', cursor: 'pointer', fontWeight: '600' }}>
                Cadastre-se
              </span>
            </p>

          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;