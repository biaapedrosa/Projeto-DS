import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tela, setTela] = useState(null);
  const [form, setForm] = useState({ nome: '', cpf: '', email: '', telefone: '', crn: '', senha: '' });
  const [formPaciente, setFormPaciente] = useState({ nome: '', email: '', senha: '', telefone_whatsapp: '', sexo: '', idade: '', ocupacao: '', objetivo: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [nutricionistas, setNutricionistas] = useState([]);

  const headers = { Authorization: `Bearer ${user.token}` };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleChangePaciente = (e) => setFormPaciente({ ...formPaciente, [e.target.name]: e.target.value });

  const handleCadastrarPaciente = async (e) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/api/pacientes', formPaciente, { headers });
      setSucesso('Paciente cadastrado com sucesso!');
      setFormPaciente({ nome: '', email: '', senha: '', telefone_whatsapp: '', sexo: '', idade: '', ocupacao: '', objetivo: '' });
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar paciente.');
    }
  };

  const handleCriarNutricionista = async (e) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/api/nutricionistas', form, { headers });
      setSucesso('Nutricionista criado com sucesso!');
      setForm({ nome: '', cpf: '', email: '', telefone: '', crn: '', senha: '' });
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao criar nutricionista.');
    }
  };

  const carregarPacientes = async () => {
    try {
      const { data } = await api.get('/api/pacientes', { headers });
      setPacientes(data);
    } catch {
      setErro('Erro ao carregar pacientes.');
    }
  };

  const carregarNutricionistas = async () => {
    try {
      const { data } = await api.get('/api/nutricionistas', { headers });
      setNutricionistas(data);
    } catch {
      setErro('Erro ao carregar nutricionistas.');
    }
  };

  useEffect(() => {
    if (tela === 'gerenciar-pacientes') carregarPacientes();
    if (tela === 'gerenciar-nutricionistas') carregarNutricionistas();
  }, [tela]);

  const handleRemoverPaciente = async (id) => {
    if (!confirm('Remover este paciente?')) return;
    try {
      await api.delete(`/api/pacientes/${id}`, { headers });
      setPacientes(pacientes.filter(p => p.id !== id));
    } catch {
      setErro('Erro ao remover paciente.');
    }
  };

  const voltar = () => { setTela(null); setErro(''); setSucesso(''); };

  const botoes = [
    { key: 'criar-nutricionista', icon: '👨‍⚕️', titulo: 'Criar Nutricionista', sub: 'Cadastrar novo profissional' },
    { key: 'gerenciar-nutricionistas', icon: '🩺', titulo: 'Gerenciar Nutricionistas', sub: 'Ver e remover profissionais' },
    { key: 'cadastrar-paciente', icon: '➕', titulo: 'Cadastrar Paciente', sub: 'Registrar novo paciente' },
    { key: 'gerenciar-pacientes', icon: '🧑‍💼', titulo: 'Gerenciar Pacientes', sub: 'Ver e remover pacientes' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7f5', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Menu principal */}
        {!tela && (
          <>
            <h2 style={{ margin: '0 0 24px', color: '#1a1a1a' }}>O que deseja fazer?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {botoes.map(({ key, icon, titulo, sub }) => (
                <button key={key} onClick={() => setTela(key)}
                  style={{ padding: '24px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a1a' }}>{titulo}</div>
                  <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{sub}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Criar nutricionista */}
        {tela === 'criar-nutricionista' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={voltar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#555' }}>←</button>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>Criar Nutricionista</h2>
            </div>
            {erro && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{erro}</div>}
            {sucesso && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{sucesso}</div>}
            <form onSubmit={handleCriarNutricionista} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'nome', label: 'Nome completo', type: 'text' },
                { name: 'cpf', label: 'CPF (só números)', type: 'text' },
                { name: 'email', label: 'E-mail', type: 'email' },
                { name: 'telefone', label: 'Telefone', type: 'text' },
                { name: 'crn', label: 'CRN (opcional)', type: 'text' },
                { name: 'senha', label: 'Senha', type: 'password' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>{label}</label>
                  <input type={type} name={name} value={form[name]} onChange={handleChange} required={name !== 'crn'}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button type="submit" style={{ padding: '12px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
                Criar Nutricionista
              </button>
            </form>
          </div>
        )}

        {/* Gerenciar nutricionistas */}
        {tela === 'gerenciar-nutricionistas' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={voltar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#555' }}>←</button>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>Gerenciar Nutricionistas</h2>
            </div>
            {erro && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{erro}</div>}
            {nutricionistas.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center', padding: '32px 0' }}>Nenhum nutricionista cadastrado.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    {['Nome', 'E-mail', 'CRN', 'Telefone', 'Role', ''].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nutricionistas.map(n => (
                    <tr key={n.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '12px' }}>{n.nome}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{n.email}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{n.crn || '—'}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{n.telefone}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                          background: n.role === 'admin' ? '#e8f5e9' : '#f5f5f5',
                          color: n.role === 'admin' ? '#2e7d32' : '#555' }}>
                          {n.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={async () => {
                          if (!confirm('Remover este nutricionista?')) return;
                          try {
                            await api.delete(`/api/nutricionistas/${n.id}`, { headers });
                            setNutricionistas(nutricionistas.filter(x => x.id !== n.id));
                          } catch { setErro('Erro ao remover nutricionista.'); }
                        }} style={{ padding: '6px 12px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Cadastrar paciente */}
        {tela === 'cadastrar-paciente' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={voltar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#555' }}>←</button>
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
                  <input type={type} name={name} value={formPaciente[name]} onChange={handleChangePaciente} required={required}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Sexo</label>
                <select name="sexo" value={formPaciente.sexo} onChange={handleChangePaciente}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Objetivo</label>
                <textarea name="objetivo" value={formPaciente.objetivo} onChange={handleChangePaciente} rows={3}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ padding: '12px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
                Cadastrar Paciente
              </button>
            </form>
          </div>
        )}

        {/* Gerenciar pacientes */}
        {tela === 'gerenciar-pacientes' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <button onClick={voltar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#555' }}>←</button>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>Gerenciar Pacientes</h2>
            </div>
            {erro && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{erro}</div>}
            {pacientes.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center', padding: '32px 0' }}>Nenhum paciente cadastrado.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    {['Nome', 'E-mail', 'Telefone', 'Idade', ''].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '12px' }}>{p.nome}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{p.email}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{p.telefone_whatsapp || '—'}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{p.idade || '—'}</td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => handleRemoverPaciente(p.id)}
                          style={{ padding: '6px 12px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
