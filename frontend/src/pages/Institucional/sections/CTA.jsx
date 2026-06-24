import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-nutri to-nutri-dark px-8 py-20 text-center">
      <h2 className="mb-4 font-serif text-[34px] font-extrabold text-white">
        Transforme sua clínica hoje
      </h2>
      <p className="mb-8 text-lg text-[#a8d5b5]">
        Junte-se a centenas de nutricionistas que já modernizaram seu atendimento.
      </p>
      <button
        onClick={() => navigate('/login?modo=cadastro')}
        className="cursor-pointer rounded-[10px] border-0 bg-white px-9 py-4 text-lg font-bold text-nutri transition-all hover:-translate-y-0.5 hover:shadow-xl"
      >
        Acessar a plataforma
      </button>
    </section>
  );
}