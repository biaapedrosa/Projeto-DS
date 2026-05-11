import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#eef2ec',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>🌿</span>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a' }}>Clínica de Nutrição</span>
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>
            Bem-vindo de volta
          </h2>
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
            Entre com suas credenciais para acessar a plataforma
          </p>
        </div>

        {erro && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#333'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#333'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#2d7a4f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>

        {/* Contas de demonstração */}
        <div style={{
          marginTop: '24px',
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '13px',
          color: '#555'
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: '600' }}>Contas de demonstração:</p>
          <p style={{ margin: '0 0 4px' }}>🟡 Nutricionista: <strong>dr@teste.com</strong></p>
          <p style={{ margin: '0 0 4px' }}>🔵 Paciente: <strong>joao@teste.com</strong></p>
          <p style={{ margin: 0, color: '#888' }}>(senha: 123456)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;