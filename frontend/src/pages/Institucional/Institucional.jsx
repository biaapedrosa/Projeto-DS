import { Link } from 'react-router-dom';

const features = [
  { icon: '🥗', title: 'Planos Personalizados', desc: 'Seu nutricionista cria um plano alimentar feito para o seu corpo e seus objetivos.' },
  { icon: '📊', title: 'Acompanhamento Contínuo', desc: 'Monitore sua evolução e mantenha o histórico completo de todos os seus planos.' },
  { icon: '💬', title: 'Comunicação Direta', desc: 'Fique sempre conectado com seu nutricionista e tire dúvidas com facilidade.' },
  { icon: '🎯', title: 'Metas e Resultados', desc: 'Defina metas claras e acompanhe o seu progresso ao longo do tratamento.' },
];

const steps = [
  { n: '01', title: 'Cadastre-se', desc: 'Crie sua conta como paciente em menos de 1 minuto.' },
  { n: '02', title: 'Conecte-se', desc: 'Seu nutricionista acessa o sistema e elabora seu plano.' },
  { n: '03', title: 'Acompanhe', desc: 'Visualize seu plano e histórico a qualquer hora, de qualquer lugar.' },
];

export default function Institucional() {
  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>🌿 Cuidado com a sua saúde</span>
          <h1 style={styles.heroTitle}>Nutrição que transforma<br />a sua vida</h1>
          <p style={styles.heroSub}>
            Planos alimentares personalizados, acompanhamento profissional e uma plataforma fácil de usar — tudo em um só lugar.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/login">
              <button style={styles.btnPrimary}>Começar agora</button>
            </Link>
            <Link to="/noticias">
              <button style={styles.btnOutline}>Ver notícias</button>
            </Link>
          </div>
        </div>
        <div style={styles.heroIllo}>🥦</div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Por que escolher a NutriClin?</h2>
        <p style={styles.sectionSub}>Tudo que você precisa para cuidar da sua alimentação com suporte profissional.</p>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.card}>
              <div style={styles.cardIcon}>{f.icon}</div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section style={{ ...styles.section, background: 'var(--green-primary)', color: '#fff' }}>
        <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>Como funciona</h2>
        <div style={styles.steps}>
          {steps.map((s) => (
            <div key={s.n} style={styles.step}>
              <div style={styles.stepNum}>{s.n}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Pronto para começar?</h2>
        <p style={styles.ctaSub}>Crie sua conta gratuitamente e acesse seu plano alimentar hoje mesmo.</p>
        <Link to="/login">
          <button style={styles.btnPrimary}>Criar minha conta</button>
        </Link>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 NutriClin · Sistema desenvolvido para a disciplina de Desenvolvimento de Sistemas – UFPE</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '80px 80px', minHeight: '480px',
    background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-medium) 100%)',
    color: '#fff',
  },
  heroContent: { maxWidth: '520px' },
  badge: {
    display: 'inline-block', background: 'rgba(255,255,255,.15)',
    borderRadius: '20px', padding: '6px 16px', fontSize: '14px', marginBottom: '20px',
  },
  heroTitle: { fontSize: '46px', lineHeight: '1.2', marginBottom: '16px', fontWeight: '700' },
  heroSub: { fontSize: '17px', opacity: .85, lineHeight: '1.7', marginBottom: '32px' },
  heroBtns: { display: 'flex', gap: '16px' },
  heroIllo: { fontSize: '160px', userSelect: 'none', opacity: .9 },
  btnPrimary: {
    background: '#fff', color: 'var(--green-primary)',
    border: 'none', borderRadius: '8px', padding: '14px 32px',
    fontWeight: '700', fontSize: '15px',
  },
  btnOutline: {
    background: 'transparent', color: '#fff',
    border: '2px solid rgba(255,255,255,.6)', borderRadius: '8px', padding: '12px 32px',
    fontWeight: '600', fontSize: '15px',
  },
  section: { padding: '72px 80px', background: 'var(--white)' },
  sectionTitle: { textAlign: 'center', fontSize: '30px', marginBottom: '8px', color: 'var(--green-dark)' },
  sectionSub: { textAlign: 'center', color: 'var(--gray-text)', marginBottom: '48px', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' },
  card: {
    background: 'var(--green-bg)', borderRadius: 'var(--radius)',
    padding: '28px 24px', textAlign: 'center',
    border: '1px solid var(--green-pale)',
  },
  cardIcon: { fontSize: '40px', marginBottom: '16px' },
  cardTitle: { fontSize: '16px', marginBottom: '8px', color: 'var(--green-dark)' },
  cardDesc: { fontSize: '14px', color: 'var(--gray-text)', lineHeight: '1.6' },
  steps: { display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' },
  step: { textAlign: 'center', maxWidth: '240px' },
  stepNum: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'rgba(255,255,255,.2)', margin: '0 auto 16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '20px', fontWeight: '700',
  },
  stepTitle: { fontSize: '18px', marginBottom: '8px' },
  stepDesc: { fontSize: '14px', opacity: .8, lineHeight: '1.6' },
  cta: {
    padding: '80px', textAlign: 'center',
    background: 'var(--green-bg)',
  },
  ctaTitle: { fontSize: '32px', color: 'var(--green-dark)', marginBottom: '12px' },
  ctaSub: { color: 'var(--gray-text)', fontSize: '16px', marginBottom: '32px' },
  footer: {
    background: 'var(--green-dark)', color: 'rgba(255,255,255,.6)',
    textAlign: 'center', padding: '24px', fontSize: '13px',
  },
};
