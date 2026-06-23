import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-wrap items-center justify-center gap-16 bg-nutri-50 px-8 py-20">
      <div className="max-w-[520px] animate-fade-up">
        <span className="rounded-full bg-nutri-100 px-3.5 py-1.5 text-sm font-semibold text-nutri">
          Nutrição digital inteligente
        </span>
        <h1 className="mb-2 mt-4 font-serif text-5xl font-extrabold leading-tight text-[#1a1a1a]">
          Planejamento alimentar <span className="text-nutri">simplificado</span>
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-[#555]">
          Automatize a criação e o envio de planos alimentares. Mais organização para nutricionistas, mais praticidade para pacientes.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/login?modo=cadastro')}
            className="cursor-pointer rounded-lg border-0 bg-nutri px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Começar agora →
          </button>
          <button
            onClick={() => navigate('/institucional')}
            className="cursor-pointer rounded-lg border border-[#ddd] bg-white px-7 py-3.5 text-base font-semibold text-[#1a1a1a] transition-all hover:-translate-y-0.5 hover:border-nutri-light hover:text-nutri"
          >
            Saiba mais
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-[480px] animate-fade-up [animation-delay:160ms]">
        <img
          src="/tela-inicio.jpg"
          alt="Alimentação saudável"
          className="w-[130%] rounded-[40px] object-cover shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
        />
        <div className="absolute -bottom-[90px] left-[30%] w-full max-w-[360px] -translate-x-1/2 animate-float rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
          <p className="mb-2 font-semibold text-[#1a1a1a]">Plano de Emagrecimento</p>
          <p className="mb-3 text-sm text-[#555]">Foco em redução calórica gradual com manutenção de macronutrientes.</p>
          <span className="rounded-full bg-nutri-100 px-2.5 py-1 text-xs font-semibold text-nutri">● Ativo</span>
        </div>
      </div>
    </section>
  );
}