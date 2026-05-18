import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Hero Section */}
      <section style={{ background: '#f8fdf9', padding: '80px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '520px' }}>
          <span style={{ background: '#e8f5e9', color: '#2d6a4f', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
            Nutrição digital inteligente
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1a1a1a', margin: '16px 0 8px', lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Planejamento alimentar{' '}
            <span style={{ color: '#2d6a4f', fontFamily: "'Playfair Display', Georgia, serif" }}>simplificado</span>
          </h1>
          <p style={{ color: '#555', fontSize: '18px', lineHeight: 1.6, marginBottom: '32px' }}>
            Automatize a criação e o envio de planos alimentares. Mais organização para nutricionistas, mais praticidade para pacientes.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/login?modo=cadastro')}
              style={{ background: '#2d6a4f', color: 'white', padding: '14px 28px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              Começar agora →
            </button>
            <button
              onClick={() => navigate('/institucional')}
              style={{ background: 'white', color: '#1a1a1a', padding: '14px 28px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              Saiba mais
            </button>
          </div>
        </div>

        {/* Card de destaque */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '340px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#e8f5e9', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🥗</div>
            <div>
              <p style={{ margin: 0, fontWeight: '700', color: '#1a1a1a' }}>+500 pacientes</p>
              <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>confiam no NutriFlow</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
            <p style={{ margin: '0 0 8px', fontWeight: '600', color: '#1a1a1a' }}>Plano de Emagrecimento</p>
            <p style={{ margin: '0 0 12px', color: '#555', fontSize: '14px' }}>Foco em redução calórica gradual com manutenção de macronutrientes.</p>
            <span style={{ background: '#e8f5e9', color: '#2d6a4f', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>● Ativo</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 32px', background: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px', fontFamily: "'Playfair Display', Georgia, serif" }}>Sobre o NutriFlow</h2>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '48px' }}>Tudo que você precisa para uma nutrição eficiente</p>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '📋', titulo: 'Planos Personalizados', desc: 'Crie planos alimentares adaptados às necessidades de cada paciente.' },
            { icon: '📊', titulo: 'Acompanhamento', desc: 'Monitore a evolução dos pacientes com histórico completo de planos.' },
            { icon: '📰', titulo: 'Notícias', desc: 'Mantenha seus pacientes informados com dicas e novidades sobre nutrição.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8fdf9', borderRadius: '16px', padding: '32px 24px', maxWidth: '280px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ color: '#1a1a1a', marginBottom: '8px' }}>{item.titulo}</h3>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#2d6a4f', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '16px', fontFamily: "'Playfair Display', Georgia, serif" }}>Pronto para começar?</h2>
        <p style={{ color: '#a8d5b5', fontSize: '18px', marginBottom: '32px' }}>Junte-se a centenas de nutricionistas que já usam o NutriFlow.</p>
        <button
          onClick={() => navigate('/login?modo=cadastro')}
          style={{ background: 'white', color: '#2d6a4f', padding: '16px 32px', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' }}
        >
          Criar conta gratuita
        </button>
      </section>

    </div>
  );
}