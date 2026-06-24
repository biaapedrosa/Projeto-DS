import {useAuth} from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import planoService from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard';

const Dashboard = () => {
  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoPlano, setNovoPlano] = useState({ descricao: '', status: 'ativo' });
  const [salvando, setSalvando] = useState(false);
  const [erroModal, setErroModal] = useState('');

  const { user } = useAuth();
  const pacienteId = user?.id;
  const fetchPlanos = async () => {
    try {
      const data = await planoService.getByPaciente(pacienteId);
      setPlanos(data);
    } catch (err) {
      setErro('Erro ao carregar planos.');
    }
  };

  useEffect(() => {
    fetchPlanos();
  }, []);

  const handleSalvar = async () => {
    if (!novoPlano.descricao.trim()) {
      setErroModal('A descrição é obrigatória.');
      return;
    }
    setSalvando(true);
    setErroModal('');
    try {
      await planoService.create({ ...novoPlano, paciente_id: pacienteId });
      setModalAberto(false);
      setNovoPlano({ descricao: '', status: 'ativo' });
      await fetchPlanos();
    } catch (err) {
      setErroModal('Erro ao salvar plano. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const handleFechar = () => {
    setModalAberto(false);
    setNovoPlano({ descricao: '', status: 'ativo' });
    setErroModal('');
  };

  const planoAtual = planos.find(p => p.status === 'ativo');
  const planosAntigos = planos.filter(p => p.status !== 'ativo');

  return (
    <div className="mx-auto max-w-[800px] p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="m-0 text-nutri">Meus Planos Alimentares</h2>
        <button
          onClick={() => setModalAberto(true)}
          className="cursor-pointer rounded-lg border-0 bg-nutri px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          + Novo Plano
        </button>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}

      {planos.length === 0 ? (
        <p>Nenhum plano encontrado.</p>
      ) : (
        <>
          {planoAtual && (
            <div>
              <h3 className="mb-3 text-[#555]">Plano Atual</h3>
              <PlanoCard plano={planoAtual} tipo="atual" />
            </div>
          )}
          {planosAntigos.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-[#555]">Histórico de Planos</h3>
              {planosAntigos.map(plano => (
                <PlanoCard key={plano.id} plano={plano} tipo="antigo" />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal Novo Plano */}
      {modalAberto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-[480px] rounded-2xl bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="mb-6 text-[22px] text-nutri">Novo Plano Alimentar</h2>

            {erroModal && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {erroModal}
              </div>
            )}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-[#333]">
                Descrição do plano
              </label>
              <textarea
                value={novoPlano.descricao}
                onChange={(e) => setNovoPlano({ ...novoPlano, descricao: e.target.value })}
                placeholder="Descreva o plano alimentar..."
                rows={4}
                className="box-border w-full resize-y rounded-lg border border-[#e0e0e0] p-3 font-sans text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-[#333]">
                Status
              </label>
              <select
                value={novoPlano.status}
                onChange={(e) => setNovoPlano({ ...novoPlano, status: e.target.value })}
                className="box-border w-full rounded-lg border border-[#e0e0e0] p-3 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleFechar}
                className="cursor-pointer rounded-lg border border-[#ccc] bg-white px-6 py-2.5 text-sm text-[#555] transition-colors hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="cursor-pointer rounded-lg border-0 bg-nutri px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {salvando ? 'Salvando...' : 'Salvar plano'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;