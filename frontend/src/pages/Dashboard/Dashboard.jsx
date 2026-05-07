import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPlanosByPaciente } from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard/PlanoCard';

const dicas = [
  { icon: '💧', tip: 'Beba ao menos 2 litros de água por dia.' },
  { icon: '🥗', tip: 'Inclua verduras e legumes em todas as refeições.' },
  { icon: '⏰', tip: 'Mantenha horários regulares para comer.' },
  { icon: '🚶', tip: 'Pratique pelo menos 30 min de atividade física diária.' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlanosByPaciente(user.id)
      .then(setPlanos)
      .catch(() => setPlanos([]))
      .finally(() => setLoading(false));
  }, [user.id]);

  const ativo = planos.find((p) => p.status === 'ativo');
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div style={styles.page}>
      {/* Banner de boas-vindas */}
      <div style={styles.banner}>
        <div>
          <p style={styles.saudacao}>{saudacao}, {user.nome.split(' ')[0]}! 👋</p>
          <h2 style={styles.bannerTitle}>Seu plano alimentar está aqui</h2>
          <p style={styles.bannerSub}>Acompanhe sua dieta e mantenha-se no caminho certo.</p>
        </div>
        <div style={styles.bannerIcon}>🥑</div>
      </div>

      <div style={styles.content}>
        {/* Plano atual */}
        <div style={styles.main}>
          <h3 style={styles.sectionTitle}>📋 Plano Atual</h3>
          {loading ? (
            <div style={styles.loading}>Carregando seu plano...</div>
          ) : ativo ? (
            <PlanoCard plano={ativo} destaque />
          ) : (
            <div style={styles.empty}>
              <span style={styles.emptyIcon}>🍽️</span>
              <p>Nenhum plano ativo no momento.</p>
              <p style={styles.emptyHint}>Aguarde seu nutricionista criar um plano para você.</p>
            </div>
          )}
        </div>

        {/* Dicas */}
        <div style={styles.sidebar}>
          <h3 style={styles.sectionTitle}>💡 Dicas de saúde</h3>
          {dicas.map((d) => (
            <div key={d.tip} style={styles.dica}>
              <span style={styles.dicaIcon}>{d.icon}</span>
              <p style={styles.dicaText}>{d.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' },
  banner: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'linear-gradient(135deg, var(--green-primary), var(--green-medium))',
    borderRadius: '14px', padding: '32px 40px', color: '#fff', marginBottom: '32px',
  },
  saudacao: { fontSize: '14px', opacity: .85, marginBottom: '6px' },
  bannerTitle: { fontSize: '26px', fontWeight: '700', marginBottom: '6px' },
  bannerSub: { fontSize: '15px', opacity: .85 },
  bannerIcon: { fontSize: '80px' },
  content: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' },
  main: {},
  sidebar: {},
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: 'var(--green-dark)', marginBottom: '16px' },
  loading: { background: 'var(--white)', borderRadius: 'var(--radius)', padding: '32px', textAlign: 'center', color: 'var(--gray-text)' },
  empty: {
    background: 'var(--white)', borderRadius: 'var(--radius)', padding: '48px 32px',
    textAlign: 'center', border: '1.5px dashed var(--gray-mid)',
  },
  emptyIcon: { fontSize: '48px', display: 'block', marginBottom: '16px' },
  emptyHint: { color: 'var(--gray-text)', fontSize: '14px', marginTop: '8px' },
  dica: {
    display: 'flex', gap: '12px', alignItems: 'flex-start',
    background: 'var(--white)', borderRadius: 'var(--radius)',
    padding: '14px 16px', marginBottom: '10px',
    boxShadow: 'var(--shadow-sm)',
  },
  dicaIcon: { fontSize: '22px' },
  dicaText: { fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.5' },
};
