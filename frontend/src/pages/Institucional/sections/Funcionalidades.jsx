import { ClipboardList, Smartphone, Lock, Bell } from 'lucide-react';

const delays = ['[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]', '[animation-delay:320ms]'];

const funcionalidades = [
  { Icon: ClipboardList, titulo: 'Planos personalizados', desc: 'Crie e ajuste planos alimentares adaptados às necessidades de cada paciente.' },
  { Icon: Smartphone, titulo: 'Acesso instantâneo', desc: 'O paciente acessa seu plano a qualquer hora, em qualquer lugar.' },
  { Icon: Lock, titulo: 'Seguro e organizado', desc: 'Histórico completo e dados protegidos, sempre disponíveis quando precisar.' },
  { Icon: Bell, titulo: 'Comunicação direta', desc: 'Notificações automáticas mantêm o paciente sempre informado e engajado.' },
];

export default function Funcionalidades() {
  return (
    <section className="bg-nutri-surface px-8 py-20 text-center">
      <h2 className="mb-2 animate-fade-up font-serif text-[34px] font-extrabold text-[#1a1a1a]">
        Funcionalidades
      </h2>
      <p className="mb-12 animate-fade-up text-base text-[#888]">
        Tudo que você precisa para uma nutrição eficiente
      </p>
      <div className="mx-auto grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {funcionalidades.map(({ Icon, titulo, desc }, i) => (
          <div
            key={i}
            className={`animate-fade-up rounded-[18px] bg-white p-8 text-left shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)] ${delays[i]}`}
          >
            <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-nutri-100">
              <Icon size={26} color="#2d6a4f" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-lg text-[#1a1a1a]">{titulo}</h3>
            <p className="text-sm leading-relaxed text-[#555]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}