import { useEffect, useState } from 'react';
import api from '../../services/api';

const emojis = ['🥦', '🍎', '🥕', '🫐', '🥑', '🍋'];

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/noticias')
      .then(({ data }) => setNoticias(data))
      .catch(() => setNoticias([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>📰 Notícias & Dicas</h2>
        <p style={styles.sub}>Fique por dentro das últimas novidades sobre nutrição e saúde.</p>
      </div>

      {loading ? (
        <p style={styles.msg}>Carregando...</p>
      ) : noticias.length === 0 ? (
        <div style={styles.empty}>
          <span style={{ fontSize: '48px' }}>📭</span>
          <p>Nenhuma notícia publicada ainda.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {noticias.map((n, i) => (
            <div key={n.id} style={styles.card}>
              <div style={styles.cardThumb}>{emojis[i % emojis.length]}</div>
              <div style={styles.cardBody}>
                <p style={styles.cardDate}>
                  {new Date(n.data_publicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <h3 style={styles.cardTitle}>{n.titulo}</h3>
                <p style={styles.cardContent}>{n.conteudo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' },
  header: {
    background: 'linear-gradient(135deg, var(--green-primary), var(--green-medium))',
    borderRadius: '14px', padding: '40px', color: '#fff', marginBottom: '40px', textAlign: 'center',
  },
  title: { fontSize: '32px', marginBottom: '8px' },
  sub: { opacity: .85, fontSize: '16px' },
  msg: { textAlign: 'center', color: 'var(--gray-text)', padding: '48px' },
  empty: { textAlign: 'center', padding: '64px', color: 'var(--gray-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  card: {
    background: 'var(--white)', borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
    border: '1px solid var(--gray-mid)',
    display: 'flex', flexDirection: 'column',
  },
  cardThumb: {
    background: 'var(--green-bg)', height: '120px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '56px',
  },
  cardBody: { padding: '20px 24px' },
  cardDate: { color: 'var(--gray-text)', fontSize: '12px', marginBottom: '8px' },
  cardTitle: { fontSize: '17px', color: 'var(--green-dark)', marginBottom: '10px', lineHeight: '1.4' },
  cardContent: { color: 'var(--text-dark)', fontSize: '14px', lineHeight: '1.7' },
};
