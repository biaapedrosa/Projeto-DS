export default function PlanoCard({ plano, destaque }) {
  const ativo = plano.status === 'ativo';
  return (
    <div style={{ ...styles.card, ...(destaque ? styles.destaque : {}) }}>
      <div style={styles.header}>
        <div>
          <span style={{ ...styles.badge, ...(ativo ? styles.badgeAtivo : styles.badgeInativo) }}>
            {ativo ? '● Ativo' : '● Inativo'}
          </span>
          {destaque && <span style={styles.badgeCurrent}>Plano atual</span>}
        </div>
        <span style={styles.date}>
          📅 {new Date(plano.data_criacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
      </div>
      <p style={styles.descricao}>{plano.descricao || 'Nenhuma descrição disponível.'}</p>
      <div style={styles.footer}>
        <span style={styles.id}>Plano #{plano.id}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--white)', borderRadius: 'var(--radius)',
    padding: '24px', marginBottom: '16px',
    border: '1.5px solid var(--gray-mid)',
    boxShadow: 'var(--shadow-sm)',
  },
  destaque: {
    border: '2px solid var(--green-light)',
    boxShadow: '0 4px 20px rgba(46,125,50,.15)',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginRight: '8px' },
  badgeAtivo: { background: '#e8f5e9', color: '#2e7d32' },
  badgeInativo: { background: '#fce4ec', color: '#c62828' },
  badgeCurrent: { background: 'var(--green-pale)', color: 'var(--green-dark)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  date: { color: 'var(--gray-text)', fontSize: '13px' },
  descricao: { color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '15px', marginBottom: '16px' },
  footer: { borderTop: '1px solid var(--gray-mid)', paddingTop: '12px' },
  id: { color: 'var(--gray-text)', fontSize: '12px' },
};
