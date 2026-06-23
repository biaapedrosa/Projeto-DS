import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#dde8de] bg-[#f0f4f0]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-8 pb-8 pt-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">

        {/* Coluna 1: logo e descrição */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-[#1a3a2a]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7 2 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7 19.8 9.4 21 12 21s5-1.2 6.4-2.6C20 16.8 21 14.5 21 12c0-5-4-10-9-10z" fill="#4CAF7D"/>
              <path d="M12 2c0 0-2 4-2 8s2 8 2 8" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 8c-3 0-5 1.5-5 4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 12c3 0 5-1.5 5-4" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>NutriFlow</span>
          </div>
          <p className="max-w-[280px] text-sm leading-relaxed text-[#5a7a6a]">
            Plataforma digital para planejamento alimentar personalizado. Mais saúde, mais organização.
          </p>
        </div>

        {/* Coluna 2: links rápidos */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#1a3a2a]">Links</h4>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><Link to="/institucional" className="text-sm text-[#4a6a5a] no-underline transition-colors hover:text-nutri-light">Sobre</Link></li>
            <li><Link to="/paciente/dashboard" className="text-sm text-[#4a6a5a] no-underline transition-colors hover:text-nutri-light">Área do Paciente</Link></li>
          </ul>
        </div>

        {/* Coluna 3: contato */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#1a3a2a]">Contato</h4>
          <p className="mb-1.5 text-sm text-[#4a6a5a]">contato@nutriflow.com</p>
          <p className="mb-1.5 text-sm text-[#4a6a5a]">(81) 3000-0000</p>
          <p className="mb-1.5 text-sm text-[#4a6a5a]">Recife, PE</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#dde8de] px-8 py-4 text-center">
        <p className="text-xs text-[#7a9a8a]">© 2024 NutriFlow. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;