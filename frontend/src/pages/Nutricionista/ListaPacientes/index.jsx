import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pacienteService from '../../../services/pacienteService';

export default function ListaPacientes() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await pacienteService.getAll();
        setPacientes(data);
      } catch (err) {
        setErro('Erro ao carregar pacientes.');
      } finally {
        setCarregando(false);
      }
    };
    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase().trim();
    return (
      p.nome?.toLowerCase().includes(termo) ||
      p.email?.toLowerCase().includes(termo) ||
      p.cpf?.replace(/\D/g, '').includes(termo.replace(/\D/g, ''))
    );
  });

  return (
    <div className="mx-auto max-w-[900px] p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="m-0 text-nutri">Meus Pacientes</h2>
        <button
          onClick={() => navigate('/nutricionista/dashboard?acao=cadastrar')}
          className="cursor-pointer rounded-lg border-0 bg-nutri px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          + Cadastrar Paciente
        </button>
      </div>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por nome, e-mail ou CPF..."
        className="mb-6 box-border w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20"
      />

      {carregando && <p className="text-[#888]">Carregando pacientes...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && pacientesFiltrados.length === 0 && (
        <p className="text-[#888]">Nenhum paciente encontrado.</p>
      )}

      <div className="grid gap-3">
        {pacientesFiltrados.map((paciente) => (
          <div
            key={paciente.id}
            onClick={() => navigate(`/nutricionista/paciente/${paciente.id}`)}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e0e0e0] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
          >
            <div>
              <div className="text-[15px] font-bold text-[#1a1a1a]">{paciente.nome}</div>
              <div className="mt-1 text-[13px] text-[#888]">{paciente.email}</div>
            </div>
            <span className="text-xl text-nutri">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}