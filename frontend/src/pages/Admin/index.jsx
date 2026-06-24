import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { UserPlus, Stethoscope, Plus, Users, ArrowLeft } from 'lucide-react';

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
    { key: 'criar-nutricionista', Icon: UserPlus, titulo: 'Criar Nutricionista', sub: 'Cadastrar novo profissional' },
    { key: 'gerenciar-nutricionistas', Icon: Stethoscope, titulo: 'Gerenciar Nutricionistas', sub: 'Ver e remover profissionais' },
    { key: 'cadastrar-paciente', Icon: Plus, titulo: 'Cadastrar Paciente', sub: 'Registrar novo paciente' },
    { key: 'gerenciar-pacientes', Icon: Users, titulo: 'Gerenciar Pacientes', sub: 'Ver e remover pacientes' },
    { key: 'meus-pacientes', Icon: Users, titulo: 'Meus Pacientes', sub: 'Prontuários e planos alimentares', rota: '/nutricionista/pacientes' },
  ];

  const cardClass = 'rounded-xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]';
  const labelClass = 'mb-1.5 block text-sm font-medium text-[#333]';
  const inputClass = 'box-border w-full rounded-lg border border-[#e0e0e0] px-3.5 py-2.5 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20';
  const submitClass = 'mt-2 cursor-pointer rounded-lg border-0 bg-[#2d7a4f] py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg';
  const thClass = 'px-3 py-2.5 text-left font-semibold text-[#555]';
  const removeBtn = 'cursor-pointer rounded-md border-0 bg-red-50 px-3 py-1.5 text-[13px] font-semibold text-red-700 transition-colors hover:bg-red-100';
  const alertErro = 'mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700';
  const alertSucesso = 'mb-4 rounded-lg bg-nutri-100 p-3 text-sm text-[#2e7d32]';

  const Cabecalho = ({ titulo }) => (
    <div className="mb-6 flex items-center gap-3">
      <button onClick={voltar} className="flex cursor-pointer items-center border-0 bg-transparent text-[#555]"><ArrowLeft size={20} /></button>
      <h2 className="m-0 text-lg text-[#1a1a1a]">{titulo}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7f5] font-sans">
      <div className="mx-auto max-w-[900px] p-10">

{/* Menu principal */}
{!tela && (
  <>
    <div className="mb-6 flex items-center justify-between">
      <h2 className="m-0 text-[#1a1a1a]">O que deseja fazer?</h2>

      <button
        onClick={() => navigate('/')}
        className="cursor-pointer rounded-lg border border-[#2d7a4f] bg-white px-4 py-2 text-sm font-semibold text-[#2d7a4f] transition-colors hover:bg-nutri-100"
      >
        Voltar para início
      </button>
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {botoes.map((b) => {
        const { key, Icon, titulo, sub } = b;
        return (
          <button
            key={key}
            onClick={() => b.rota ? navigate(b.rota) : setTela(key)}
            className="cursor-pointer rounded-xl border border-[#e0e0e0] bg-white p-6 text-left shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
          >
            <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-nutri-100">
              <Icon size={24} color="#2d6a4f" strokeWidth={2} />
            </div>
            <div className="text-[15px] font-bold text-[#1a1a1a]">{titulo}</div>
            <div className="mt-1 text-[13px] text-[#888]">{sub}</div>
          </button>
        );
      })}
    </div>
  </>
)}

        {/* Criar nutricionista */}
        {tela === 'criar-nutricionista' && (
          <div className={cardClass}>
            <Cabecalho titulo="Criar Nutricionista" />
            {erro && <div className={alertErro}>{erro}</div>}
            {sucesso && <div className={alertSucesso}>{sucesso}</div>}
            <form onSubmit={handleCriarNutricionista} className="flex flex-col gap-3.5">
              {[
                { name: 'nome', label: 'Nome completo', type: 'text' },
                { name: 'cpf', label: 'CPF (só números)', type: 'text' },
                { name: 'email', label: 'E-mail', type: 'email' },
                { name: 'telefone', label: 'Telefone', type: 'text' },
                { name: 'crn', label: 'CRN (opcional)', type: 'text' },
                { name: 'senha', label: 'Senha', type: 'password' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input type={type} name={name} value={form[name]} onChange={handleChange} required={name !== 'crn'} className={inputClass} />
                </div>
              ))}
              <button type="submit" className={submitClass}>Criar Nutricionista</button>
            </form>
          </div>
        )}

        {/* Gerenciar nutricionistas */}
        {tela === 'gerenciar-nutricionistas' && (
          <div className={cardClass}>
            <Cabecalho titulo="Gerenciar Nutricionistas" />
            {erro && <div className={alertErro}>{erro}</div>}
            {nutricionistas.length === 0 ? (
              <p className="py-8 text-center text-[#888]">Nenhum nutricionista cadastrado.</p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[#f0f0f0]">
                    {['Nome', 'E-mail', 'CRN', 'Telefone', 'Role', ''].map(h => (
                      <th key={h} className={thClass}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nutricionistas.map(n => (
                    <tr key={n.id} className="border-b border-[#f5f5f5]">
                      <td className="p-3">{n.nome}</td>
                      <td className="p-3 text-[#666]">{n.email}</td>
                      <td className="p-3 text-[#666]">{n.crn || '—'}</td>
                      <td className="p-3 text-[#666]">{n.telefone}</td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${n.role === 'admin' ? 'bg-nutri-100 text-[#2e7d32]' : 'bg-[#f5f5f5] text-[#555]'}`}>
                          {n.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <button onClick={async () => {
                          if (!confirm('Remover este nutricionista?')) return;
                          try {
                            await api.delete(`/api/nutricionistas/${n.id}`, { headers });
                            setNutricionistas(nutricionistas.filter(x => x.id !== n.id));
                          } catch { setErro('Erro ao remover nutricionista.'); }
                        }} className={removeBtn}>
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
          <div className={cardClass}>
            <Cabecalho titulo="Cadastrar Paciente" />
            {erro && <div className={alertErro}>{erro}</div>}
            {sucesso && <div className={alertSucesso}>{sucesso}</div>}
            <form onSubmit={handleCadastrarPaciente} className="flex flex-col gap-3.5">
              {[
                { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                { name: 'email', label: 'E-mail', type: 'email', required: true },
                { name: 'senha', label: 'Senha', type: 'password', required: true },
                { name: 'telefone_whatsapp', label: 'Telefone / WhatsApp', type: 'text', required: false },
                { name: 'ocupacao', label: 'Ocupação', type: 'text', required: false },
                { name: 'idade', label: 'Idade', type: 'number', required: false },
              ].map(({ name, label, type, required }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input type={type} name={name} value={formPaciente[name]} onChange={handleChangePaciente} required={required} className={inputClass} />
                </div>
              ))}
              <div>
                <label className={labelClass}>Sexo</label>
                <select name="sexo" value={formPaciente.sexo} onChange={handleChangePaciente} className={inputClass}>
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Objetivo</label>
                <textarea name="objetivo" value={formPaciente.objetivo} onChange={handleChangePaciente} rows={3} className={`${inputClass} resize-y`} />
              </div>
              <button type="submit" className={submitClass}>Cadastrar Paciente</button>
            </form>
          </div>
        )}

        {/* Gerenciar pacientes */}
        {tela === 'gerenciar-pacientes' && (
          <div className={cardClass}>
            <Cabecalho titulo="Gerenciar Pacientes" />
            {erro && <div className={alertErro}>{erro}</div>}
            {pacientes.length === 0 ? (
              <p className="py-8 text-center text-[#888]">Nenhum paciente cadastrado.</p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[#f0f0f0]">
                    {['Nome', 'E-mail', 'Telefone', 'Idade', ''].map(h => (
                      <th key={h} className={thClass}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map(p => (
                    <tr key={p.id} className="border-b border-[#f5f5f5]">
                      <td className="p-3">{p.nome}</td>
                      <td className="p-3 text-[#666]">{p.email}</td>
                      <td className="p-3 text-[#666]">{p.telefone_whatsapp || '—'}</td>
                      <td className="p-3 text-[#666]">{p.idade || '—'}</td>
                      <td className="p-3">
                        <button onClick={() => handleRemoverPaciente(p.id)} className={removeBtn}>
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