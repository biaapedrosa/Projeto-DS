import { Heart, Microscope, Zap } from 'lucide-react';

const delays = ['[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]'];

const valores = [
  { Icon: Heart, titulo: 'Cuidado', desc: 'Colocamos a saúde e o bem-estar das pessoas no centro de tudo o que construímos.' },
  { Icon: Microscope, titulo: 'Precisão', desc: 'Planos baseados em ciência, personalizados para a realidade de cada paciente.' },
  { Icon: Zap, titulo: 'Inovação', desc: 'Tecnologia simples e eficiente que economiza tempo de quem cuida e de quem é cuidado.' },
];

export default function Valores() {
  return (
    <section className="bg-white px-8 py-20 text-center">
      <h2 className="mb-2 animate-fade-up font-serif text-[34px] font-extrabold text-[#1a1a1a]">
        Nossos valores
      </h2>
      <p className="mb-12 animate-fade-up text-base text-[#888]">
        O que nos guia em cada decisão
      </p>
      <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-6">
        {valores.map(({ Icon, titulo, desc }, i) => (
          <div
            key={i}
            className={`max-w-[300px] flex-[1_1_240px] animate-fade-up rounded-[18px] border border-[#eaf2ec] bg-nutri-50 p-9 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)] ${delays[i]}`}
          >
            <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-nutri-100">
              <Icon size={34} color="#2d6a4f" strokeWidth={2} />
            </div>
            <h3 className="mb-2.5 text-xl text-[#1a1a1a]">{titulo}</h3>
            <p className="text-[15px] leading-relaxed text-[#555]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}