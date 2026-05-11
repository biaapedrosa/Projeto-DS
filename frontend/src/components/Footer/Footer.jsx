import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Coluna 1: logo e descrição */}
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7 2 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7 19.8 9.4 21 12 21s5-1.2 6.4-2.6C20 16.8 21 14.5 21 12c0-5-4-10-9-10z" fill="#4CAF7D"/>
              <path d="M12 2c0 0-2 4-2 8s2 8 2 8" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 8c-3 0-5 1.5-5 4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 12c3 0 5-1.5 5-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>NutriFlow</span>
          </div>
          <p>Plataforma digital para planejamento alimentar personalizado. Mais saúde, mais organização.</p>
        </div>

        {/* Coluna 2: links rápidos */}
        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li><Link to="/institucional">Sobre</Link></li>
            <li><Link to="/noticias">Notícias</Link></li>
            <li><Link to="/dashboard">Área do Paciente</Link></li>
          </ul>
        </div>

        {/* Coluna 3: contato */}
        <div className="footer-contact">
          <h4>Contato</h4>
          <p>contato@nutriflow.com</p>
          <p>(81) 3000-0000</p>
          <p>Recife, PE</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 NutriFlow. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;