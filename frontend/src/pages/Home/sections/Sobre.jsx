import { ClipboardList, BarChart3, Smartphone } from 'lucide-react';

const delays = ['[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]'];

const cards = [
  { Icon: ClipboardList, titulo: 'Planos Personalizados', desc: 'Crie planos alimentares adaptados às necessidades de cada paciente.' },
  { Icon: BarChart3, titulo: 'Acompanhamento', desc: 'Monitore a evolução dos pacientes com histórico completo de planos.' },
  { Icon: Smartphone, titulo: 'Acesso Online', desc: 'Seus pacientes acessam o plano alimentar a qualquer hora, em qualquer lugar.' },
];

export default function Sobre() {
  return (
    <section className="bg-white px-8 py-20 text-center">
      <h2 className="mb-2 animate-fade-up font-serif text-4xl font-extrabold text-[#1a1a1a]">Sobre o NutriFlow</h2>
      <p className="mb-12 animate-fade-up text-base text-[#888]">Tudo que você precisa para uma nutrição eficiente</p>

      <div className="flex flex-wrap justify-center gap-6">
        {cards.map(({ Icon, titulo, desc }, i) => (
          <div
            key={i}
            className={`max-w-[280px] animate-fade-up rounded-2xl border border-[#eaf2ec] bg-nutri-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)] ${delays[i]}`}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-nutri-100">
              <Icon size={30} color="#2d6a4f" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-[#1a1a1a]">{titulo}</h3>
            <p className="text-sm leading-relaxed text-[#555]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}