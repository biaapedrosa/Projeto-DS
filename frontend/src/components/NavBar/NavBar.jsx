// useAuth: hook que dá acesso ao contexto de autenticação (usuário logado e função de logout)
import { useAuth } from '../../context/AuthContext';

// useNavigate: permite redirecionar o usuário para outra rota programaticamente
// Link: componente do React Router para navegar entre páginas sem recarregar a tela
import { useNavigate, Link } from 'react-router-dom';

// useState: guarda o estado de aberto/fechado do menu hambúrguer (mobile)
import { useState } from 'react';

// Importa o CSS específico da NavBar
import './NavBar.css';

const NavBar = () => {
  // Pega o usuário logado e a função de logout do contexto global
  const { logout, user } = useAuth();

  // Hook para navegar após o logout
  const navigate = useNavigate();

  // Controla se o menu hambúrguer (versão mobile) está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Executa o logout e redireciona para a tela de login
  const handleLogout = () => {
    logout();           // limpa o token do localStorage e zera o estado do usuário
    navigate('/login'); // redireciona para a tela de login
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo clicável que leva para a página inicial */}
        <Link to="/" className="navbar-logo">
          {/* SVG inline da folha — ícone da marca NutriFlow */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C7 2 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7 19.8 9.4 21 12 21s5-1.2 6.4-2.6C20 16.8 21 14.5 21 12c0-5-4-10-9-10z" fill="#4CAF7D"/>
            <path d="M12 2c0 0-2 4-2 8s2 8 2 8" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 8c-3 0-5 1.5-5 4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 12c3 0 5-1.5 5-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>NutriFlow</span>
        </Link>

        {/* Menu de navegação — exibe links diferentes dependendo se o usuário está logado */}
        {/* A classe "open" é adicionada quando o menu hambúrguer está ativo no mobile */}
        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {user ? (
            // Usuário logado: mostra as páginas internas e o botão de sair
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/noticias" onClick={() => setMenuOpen(false)}>Notícias</Link>
              <Link to="/historico" onClick={() => setMenuOpen(false)}>Histórico</Link>
              <button className="btn-sair" onClick={handleLogout}>Sair</button>
            </>
          ) : (
            // Usuário deslogado: mostra as páginas públicas e o botão de entrar
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

        {/* Botão hambúrguer — visível só em telas pequenas (definido no CSS)
            Ao clicar, alterna o estado menuOpen para mostrar/esconder o menu */}
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
