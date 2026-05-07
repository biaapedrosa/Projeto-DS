import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPlanosByPaciente } from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard/PlanoCard';

export default function Historico() {
  const { user } = useAuth();
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlanosByPaciente(user.id)
      .then(setPlanos)
      .catch(() => setPlanos([]))
      .finally(() => setLoading(false));
  }, [user.id]);

  const ativos = planos.filter((p) => p.status === 'ativo').length;
  const total = planos.length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Histórico de Planos</h2>
          <p style={styles.sub}>Todos os planos alimentares do seu acompanhamento.</p>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <span style={styles.statNum}>{total}</span>
          <span style={styles.statLabel}>Total de planos</span>
        </div>
        <div style={styles.stat}>
          <span style={{ ...styles.statNum, color: 'var(--green-primary)' }}>{ativos}</span>
          <span style={styles.statLabel}>Planos ativos</span>
        </div>
        <div style={styles.stat}>
          <span style={{ ...styles.statNum, color: '#c62828' }}>{total - ativos}</span>
          <span style={styles.statLabel}>Planos encerrados</span>
        </div>
      </div>

      {/* Lista */}
      <div style={styles.list}>
        {loading ? (
          <p style={styles.msg}>Carregando histórico...</p>
        ) : planos.length === 0 ? (
          <div style={styles.empty}>
            <span style={{ fontSize: '48px' }}>📋</span>
            <p>Nenhum plano encontrado.</p>
            <p style={{ color: 'var(--gray-text)', fontSize: '14px' }}>Seu nutricionista ainda não criou nenhum plano.</p>
          </div>
        ) : (
          planos.map((p) => <PlanoCard key={p.id} plano={p} destaque={p.status === 'ativo'} />)
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '800px', margin: '0 auto', padding: '40px 24px' },
  header: {
    marginBottom: '24px',
  },
  title: { fontSize: '28px', color: 'var(--green-dark)', marginBottom: '6px' },
  sub: { color: 'var(--gray-text)', fontSize: '15px' },
  stats: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px',
  },
  stat: {
    background: 'var(--white)', borderRadius: 'var(--radius)', padding: '20px 24px',
    boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-mid)', textAlign: 'center',
  },
  statNum: { display: 'block', fontSize: '36px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' },
  statLabel: { color: 'var(--gray-text)', fontSize: '13px' },
  list: {},
  msg: { textAlign: 'center', color: 'var(--gray-text)', padding: '48px' },
  empty: {
    textAlign: 'center', padding: '64px', color: 'var(--text-dark)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
    background: 'var(--white)', borderRadius: 'var(--radius)',
  },
};
