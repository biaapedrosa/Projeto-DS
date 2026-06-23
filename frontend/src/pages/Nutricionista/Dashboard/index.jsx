import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../services/api';
import { UserPlus, Users, ArrowLeft } from 'lucide-react';

const formInicial = { nome: '', cpf: '', cartao_sus: '', email: '', telefone_whatsapp: '', data_nascimento: '' };

export default function NutricionistaDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tela, setTela] = useState(null);
  const [form, setForm] = useState(formInicial);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Permite abrir direto no formulário de cadastro (ex.: vindo da lista de pacientes).
  useEffect(() => {
    if (searchParams.get('acao') === 'cadastrar') setTela('cadastrar-paciente');
  }, [searchParams]);

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Pré-cadastro (etapa 1). O paciente recebe o CPF e depois ativa a conta
  // criando a senha. Por isso aqui não se coleta senha. O token de auth é
  // anexado automaticamente pelo interceptor do axios (api.js).
  const handleCadastrarPaciente = async (e) => {
    e.preventDefault();
    setErro(''); setSucesso('');
    try {
      await api.post('/api/pacientes/precadastro', form);
      setSucesso('Paciente pré-cadastrado! Ele já pode ativar a conta com o CPF.');
      setForm(formInicial);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar paciente.');
    }
  };

  const labelClass = 'mb-1.5 block text-sm font-medium text-[#333]';
  const inputClass = 'box-border w-full rounded-lg border border-[#e0e0e0] px-3.5 py-2.5 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20';

  return (
    <div className="min-h-screen bg-[#f5f7f5] font-sans">
      <div className="mx-auto max-w-[800px] p-10">

        {!tela && (
          <>
            <h2 className="mb-6 text-[#1a1a1a]">O que deseja fazer?</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              <button
                onClick={() => setTela('cadastrar-paciente')}
                className="cursor-pointer rounded-xl border border-[#e0e0e0] bg-white p-6 text-left shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
              >
                <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-nutri-100">
                  <UserPlus size={24} color="#2d6a4f" strokeWidth={2} />
                </div>
                <div className="text-[15px] font-bold text-[#1a1a1a]">Cadastrar Paciente</div>
                <div className="mt-1 text-[13px] text-[#888]">Registrar novo paciente</div>
              </button>

              <button
                onClick={() => navigate('/nutricionista/pacientes')}
                className="cursor-pointer rounded-xl border border-[#e0e0e0] bg-white p-6 text-left shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
              >
                <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-nutri-100">
                  <Users size={24} color="#2d6a4f" strokeWidth={2} />
                </div>
                <div className="text-[15px] font-bold text-[#1a1a1a]">Meus Pacientes</div>
                <div className="mt-1 text-[13px] text-[#888]">Ver prontuários, planos e fichas médicas</div>
              </button>
            </div>
            <button onClick={handleLogout} className="mt-6 cursor-pointer border-0 bg-transparent text-sm text-[#555] underline">
              Sair
            </button>
          </>
        )}

        {tela === 'cadastrar-paciente' && (
          <div className="rounded-xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="mb-6 flex items-center gap-3">
              <button onClick={() => { setTela(null); setErro(''); setSucesso(''); }} className="flex cursor-pointer items-center border-0 bg-transparent text-[#555]"><ArrowLeft size={20} /></button>
              <h2 className="m-0 text-lg text-[#1a1a1a]">Cadastrar Paciente</h2>
            </div>

            {erro && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</div>}
            {sucesso && <div className="mb-4 rounded-lg bg-nutri-100 p-3 text-sm text-[#2e7d32]">{sucesso}</div>}

            <form onSubmit={handleCadastrarPaciente} className="flex flex-col gap-3.5">
              {[
                { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                { name: 'cpf', label: 'CPF (somente números)', type: 'text', required: true },
                { name: 'email', label: 'E-mail', type: 'email', required: true },
                { name: 'cartao_sus', label: 'Cartão SUS', type: 'text', required: false },
                { name: 'telefone_whatsapp', label: 'Telefone / WhatsApp', type: 'text', required: false },
                { name: 'data_nascimento', label: 'Data de nascimento', type: 'date', required: false },
              ].map(({ name, label, type, required }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    className={inputClass}
                  />
                </div>
              ))}

              <button type="submit" className="mt-2 cursor-pointer rounded-lg border-0 bg-[#2d7a4f] py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Cadastrar Paciente
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}