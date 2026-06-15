import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      authService.socialLogin({ nome: user.name, email: user.email }) // usa authService, não api diretamente
        .then((data) => {
          setUser(data);
          localStorage.setItem('nutriflow:user', JSON.stringify(data));
          navigate(data.tipo === 'nutricionista' ? '/nutricionista/dashboard' : '/paciente/dashboard');
        })
        .catch(() => setErro('Erro ao autenticar com Google.'));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (searchParams.get('modo') === 'cadastro') {
      setModo('cadastro');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const data = await login(form);
      if (data.tipo === 'nutricionista' && data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.tipo === 'nutricionista') {
        navigate('/nutricionista/dashboard');
      } else {
        navigate('/paciente/dashboard');
      }
    } catch (err) {
      setErro('Email ou senha inválidos!');
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/api/auth/register', form);
      setModalAberto(true);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar.');
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setModo('login');
    setForm({ nome: '', email: '', senha: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#eef2ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '48px 40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>🌿</span>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a' }}>Clínica de Nutrição</span>
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>
            {modo === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
            {modo === 'login' ? 'Entre com suas credenciais' : 'Preencha seus dados para se cadastrar'}
          </p>
        </div>

        {erro && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        <form onSubmit={modo === 'login' ? handleLogin : handleCadastro}>
          {modo === 'cadastro' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontSize: '14px', fontWeight: '500' }}>Nome</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontSize: '14px', fontWeight: '500' }}>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontSize: '14px', fontWeight: '500' }}>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '14px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
            {modo === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        {modo === 'login' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
              <span style={{ color: '#888', fontSize: '13px' }}>ou</span>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
            </div>
            <button
              onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
              style={{ width: '100%', padding: '14px', background: 'white', color: '#333', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Entrar com Google
            </button>
          </>
        )}

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#555' }}>
          {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <span onClick={() => { setModo(modo === 'login' ? 'cadastro' : 'login'); setErro(''); }} style={{ color: '#2d7a4f', cursor: 'pointer', fontWeight: '600' }}>
            {modo === 'login' ? 'Cadastre-se' : 'Entrar'}
          </span>
        </p>

        {modo === 'login' && (
          <div style={{ marginTop: '24px', background: '#f5f5f5', borderRadius: '8px', padding: '16px', fontSize: '13px', color: '#555' }}>
            <p style={{ margin: '0 0 8px', fontWeight: '600' }}>Contas de demonstração:</p>
            <p style={{ margin: '0 0 4px' }}>🟡 Nutricionista: <strong>dr@teste.com</strong></p>
            <p style={{ margin: '0 0 4px' }}>🔵 Paciente: <strong>joao@teste.com</strong></p>
            <p style={{ margin: 0, color: '#888' }}>(senha: 123456)</p>
          </div>
        )}
      </div>

      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px 40px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ color: '#2d7a4f', marginBottom: '8px' }}>Cadastro realizado!</h2>
            <p style={{ color: '#555', marginBottom: '24px' }}>Sua conta foi criada com sucesso. Faça login para acessar a plataforma.</p>
            <button onClick={handleFecharModal} style={{ background: '#2d7a4f', color: 'white', padding: '12px 32px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Fazer login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;