import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function NutricionistaDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tela, setTela] = useState(null);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', telefone_whatsapp: '', sexo: '', idade: '', ocupacao: '', objetivo: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCadastrarPaciente = async (e) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/api/pacientes', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSucesso('Paciente cadastrado com sucesso!');
      setForm({ nome: '', email: '', senha: '', telefone_whatsapp: '', sexo: '', idade: '', ocupacao: '', objetivo: '' });
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar paciente.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7f5', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>

        {!tela && (
          <>
            <h2 style={{ margin: '0 0 24px', color: '#1a1a1a' }}>O que deseja fazer?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              <button
                onClick={() => setTela('cadastrar-paciente')}
                style={{ padding: '24px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🧑‍💼</div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a1a' }}>Cadastrar Paciente</div>
                <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Registrar novo paciente</div>
              </button>
            </div>
          </>
        )}

        {tela === 'cadastrar-paciente' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => { setTela(null); setErro(''); setSucesso(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#555' }}>←</button>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>Cadastrar Paciente</h2>
            </div>

            {erro && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{erro}</div>}
            {sucesso && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{sucesso}</div>}

            <form onSubmit={handleCadastrarPaciente} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                { name: 'email', label: 'E-mail', type: 'email', required: true },
                { name: 'senha', label: 'Senha', type: 'password', required: true },
                { name: 'telefone_whatsapp', label: 'Telefone / WhatsApp', type: 'text', required: false },
                { name: 'ocupacao', label: 'Ocupação', type: 'text', required: false },
                { name: 'idade', label: 'Idade', type: 'number', required: false },
              ].map(({ name, label, type, required }) => (
                <div key={name}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Sexo</label>
                <select name="sexo" value={form.sexo} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Objetivo</label>
                <textarea name="objetivo" value={form.objetivo} onChange={handleChange} rows={3}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>

              <button type="submit" style={{ padding: '12px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
                Cadastrar Paciente
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
