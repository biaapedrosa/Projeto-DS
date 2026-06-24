import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-nutri to-nutri-dark px-8 py-20 text-center">
      <h2 className="mb-4 font-serif text-4xl font-extrabold text-white">Pronto para começar?</h2>
      <p className="mb-8 text-lg text-[#a8d5b5]">Junte-se a centenas de nutricionistas que já usam o NutriFlow.</p>
      <button
        onClick={() => navigate('/login?modo=cadastro')}
        className="cursor-pointer rounded-lg border-0 bg-white px-8 py-4 text-lg font-bold text-nutri transition-all hover:-translate-y-0.5 hover:shadow-xl"
      >
        Criar conta gratuita
      </button>
    </section>
  );
}