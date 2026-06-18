import { useNavigate } from 'react-router-dom';
import { Leaf, Target, Eye, HeartHandshake } from 'lucide-react';

export default function Institucional() {
  const navigate = useNavigate();

  const valores = [
    { icon: <Target size={28} color="#2d6a4f" />, titulo: 'Missão', desc: 'Tornar o acompanhamento nutricional mais simples, organizado e acessível, conectando nutricionistas e pacientes em uma única plataforma.' },
    { icon: <Eye size={28} color="#2d6a4f" />, titulo: 'Visão', desc: 'Ser a referência em gestão de planos alimentares, ajudando pessoas a alcançarem uma alimentação mais saudável e consciente.' },
    { icon: <HeartHandshake size={28} color="#2d6a4f" />, titulo: 'Valores', desc: 'Cuidado com o paciente, transparência, base científica e respeito à individualidade de cada plano alimentar.' },
  ];

  const numeros = [
    { valor: '+500', label: 'Planos criados' },
    { valor: '+120', label: 'Pacientes acompanhados' },
    { valor: '98%', label: 'Satisfação' },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Hero institucional */}
      <section style={{ background: '#f8fdf9', padding: '72px 32px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e8f5e9', color: '#2d6a4f', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
          <Leaf size={15} /> Sobre o NutriFlow
        </span>
        <h1 style={{ fontSize: '44px', fontWeight: '800', color: '#1a1a1a', margin: '20px auto 16px', maxWidth: '700px', lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif" }}>
          Nutrição digital para uma vida mais equilibrada
        </h1>
        <p style={{ color: '#555', fontSize: '18px', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
          O NutriFlow nasceu para descomplicar o dia a dia de nutricionistas e pacientes,
          reunindo a criação, o envio e o acompanhamento de planos alimentares em um só lugar.
        </p>
      </section>

      {/* Missão, Visão, Valores */}
      <section style={{ padding: '72px 32px', background: 'white' }}>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          {valores.map((item, i) => (
            <div key={i} style={{ background: '#f8fdf9', borderRadius: '16px', padding: '32px 28px', maxWidth: '300px', flex: '1 1 260px' }}>
              <div style={{ background: '#e8f5e9', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {item.icon}
              </div>
              <h3 style={{ color: '#1a1a1a', margin: '0 0 8px', fontSize: '20px' }}>{item.titulo}</h3>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Números */}
      <section style={{ background: '#2d6a4f', padding: '56px 32px' }}>
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          {numeros.map((n, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '44px', fontWeight: '800', color: 'white', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{n.valor}</p>
              <p style={{ color: '#a8d5b5', fontSize: '15px', margin: '4px 0 0' }}>{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quem somos */}
      <section style={{ padding: '72px 32px', background: 'white', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', marginBottom: '16px', fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center' }}>
          Quem somos
        </h2>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.7, textAlign: 'center' }}>
          O NutriFlow é um projeto desenvolvido por estudantes do Centro de Informática da UFPE,
          na disciplina de Desenvolvimento de Software. Combinamos tecnologia e nutrição para
          oferecer uma experiência segura, intuitiva e centrada no paciente — do primeiro
          atendimento ao acompanhamento contínuo da sua alimentação.
        </p>
      </section>

      {/* CTA */}
      <section style={{ background: '#f8fdf9', padding: '64px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1a1a1a', marginBottom: '12px', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Faça parte do NutriFlow
        </h2>
        <p style={{ color: '#888', fontSize: '17px', marginBottom: '28px' }}>Comece a organizar seus planos alimentares hoje mesmo.</p>
        <button
          onClick={() => navigate('/login?modo=cadastro')}
          style={{ background: '#2d6a4f', color: 'white', padding: '16px 32px', border: 'none', borderRadius: '8px', fontSize: '17px', fontWeight: '700', cursor: 'pointer' }}
        >
          Criar conta gratuita
        </button>
      </section>

    </div>
  );
}
