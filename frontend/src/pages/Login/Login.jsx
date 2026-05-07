import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { register } from '../../services/authService';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      if (modo === 'login') {
        await login(form.email, form.senha);
      } else {
        await register(form.nome, form.email, form.senha);
        await login(form.email, form.senha);
      }
      navigate('/dashboard');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.bigIcon}>🌿</div>
          <h2 style={styles.leftTitle}>Bem-vindo à<br />NutriClin</h2>
          <p style={styles.leftSub}>Cuide da sua saúde com acompanhamento nutricional profissional e personalizado.</p>
          <div style={styles.pills}>
            {['Planos personalizados', 'Acompanhamento contínuo', 'Resultados reais'].map((t) => (
              <span key={t} style={styles.pill}>✓ {t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>{modo === 'login' ? 'Entrar na conta' : 'Criar conta'}</h2>
          <p style={styles.formSub}>
            {modo === 'login' ? 'Acesse seu plano alimentar' : 'Comece seu acompanhamento hoje'}
          </p>

          {modo === 'register' && (
            <div style={styles.field}>
              <label style={styles.label}>Nome completo</label>
              <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} style={styles.input} required />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>E-mail</label>
            <input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <input name="senha" type="password" placeholder="••••••••" value={form.senha} onChange={handleChange} style={styles.input} required />
          </div>

          {erro && <div style={styles.erro}>⚠ {erro}</div>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
          </button>

          <div style={styles.divider}><span>ou</span></div>

          <p style={styles.toggle}>
            {modo === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            {' '}
            <span onClick={() => { setModo(modo === 'login' ? 'register' : 'login'); setErro(''); }} style={styles.toggleLink}>
              {modo === 'login' ? 'Cadastre-se' : 'Entrar'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: 'calc(100vh - 64px)' },
  left: {
    flex: 1, background: 'linear-gradient(160deg, var(--green-primary) 0%, var(--green-dark) 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '60px',
  },
  leftContent: { maxWidth: '380px', color: '#fff' },
  bigIcon: { fontSize: '64px', marginBottom: '24px' },
  leftTitle: { fontSize: '36px', fontWeight: '700', lineHeight: '1.2', marginBottom: '16px' },
  leftSub: { fontSize: '16px', opacity: .85, lineHeight: '1.7', marginBottom: '32px' },
  pills: { display: 'flex', flexDirection: 'column', gap: '10px' },
  pill: { fontSize: '15px', opacity: .9 },
  right: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--white)', padding: '60px',
  },
  form: { width: '100%', maxWidth: '380px' },
  formTitle: { fontSize: '26px', color: 'var(--green-dark)', marginBottom: '4px' },
  formSub: { color: 'var(--gray-text)', fontSize: '14px', marginBottom: '32px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '6px' },
  input: {
    width: '100%', padding: '12px 14px', fontSize: '14px',
    border: '1.5px solid var(--gray-mid)', borderRadius: '8px',
    outline: 'none', transition: 'border .2s',
  },
  erro: {
    background: '#fce4ec', color: '#c62828', borderRadius: '8px',
    padding: '10px 14px', fontSize: '13px', marginBottom: '16px',
  },
  btn: {
    width: '100%', padding: '13px', background: 'var(--green-primary)',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontWeight: '600', fontSize: '15px', marginTop: '4px',
  },
  divider: {
    textAlign: 'center', color: 'var(--gray-text)', fontSize: '13px',
    margin: '20px 0', position: 'relative',
  },
  toggle: { textAlign: 'center', fontSize: '14px', color: 'var(--gray-text)' },
  toggleLink: { color: 'var(--green-primary)', fontWeight: '600', cursor: 'pointer' },
};
