export default function Hero() {
  return (
    <section className="bg-[linear-gradient(160deg,#f8fdf9_0%,#eef5f0_100%)] px-8 py-[88px] text-center">
      <div className="mx-auto max-w-[760px] animate-fade-up">
        <span className="rounded-full bg-nutri-100 px-4 py-1.5 text-sm font-semibold text-nutri">
          Sobre o NutriFlow
        </span>
        <h1 className="mb-4 mt-5 font-serif text-[46px] font-extrabold leading-[1.15] text-[#1a1a1a]">
          Conectando nutricionistas e pacientes <span className="text-nutri">de forma digital</span>
        </h1>
        <p className="text-[19px] leading-relaxed text-[#555]">
          Nossa missão é simplificar o planejamento alimentar, aproximando profissionais e pacientes
          por meio de uma plataforma intuitiva, segura e feita para o dia a dia da clínica.
        </p>
      </div>
    </section>
  );
}