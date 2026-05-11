import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState('login'); // 'login' ou 'cadastro'
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await login(form);
      navigate('/dashboard');
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

        {/* Logo */}
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

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#555' }}>
          {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <span
            onClick={() => { setModo(modo === 'login' ? 'cadastro' : 'login'); setErro(''); }}
            style={{ color: '#2d7a4f', cursor: 'pointer', fontWeight: '600' }}
          >
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

      {/* Modal cadastro finalizado */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px 40px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ color: '#2d7a4f', marginBottom: '8px' }}>Cadastro realizado!</h2>
            <p style={{ color: '#555', marginBottom: '24px' }}>Sua conta foi criada com sucesso. Faça login para acessar a plataforma.</p>
            <button
              onClick={handleFecharModal}
              style={{ background: '#2d7a4f', color: 'white', padding: '12px 32px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              Fazer login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;