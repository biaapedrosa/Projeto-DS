import { useEffect, useState } from 'react';
import planoService from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard/PlanoCard';

const Dashboard = () => {
  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [novoPlano, setNovoPlano] = useState({ descricao: '', status: 'ativo' });
  const [salvando, setSalvando] = useState(false);
  const [erroModal, setErroModal] = useState('');

  const pacienteId = 2;

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
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#2d6a4f', margin: 0 }}>Meus Planos Alimentares</h2>
        <button
          onClick={() => setModalAberto(true)}
          style={{ background: '#2d6a4f', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          + Novo Plano
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {planos.length === 0 ? (
        <p>Nenhum plano encontrado.</p>
      ) : (
        <>
          {planoAtual && (
            <div>
              <h3 style={{ color: '#555', marginBottom: '12px' }}>Plano Atual</h3>
              <PlanoCard plano={planoAtual} tipo="atual" />
            </div>
          )}
          {planosAntigos.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: '#555', marginBottom: '12px' }}>Histórico de Planos</h3>
              {planosAntigos.map(plano => (
                <PlanoCard key={plano.id} plano={plano} tipo="antigo" />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal Novo Plano */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '480px', width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <h2 style={{ color: '#2d6a4f', marginBottom: '24px', fontSize: '22px' }}>Novo Plano Alimentar</h2>

            {erroModal && (
              <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                {erroModal}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Descrição do plano
              </label>
              <textarea
                value={novoPlano.descricao}
                onChange={(e) => setNovoPlano({ ...novoPlano, descricao: e.target.value })}
                placeholder="Descreva o plano alimentar..."
                rows={4}
                style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
                Status
              </label>
              <select
                value={novoPlano.status}
                onChange={(e) => setNovoPlano({ ...novoPlano, status: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleFechar}
                style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '8px', background: 'white', color: '#555', fontSize: '14px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando}
                style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#2d6a4f', color: 'white', fontSize: '14px', fontWeight: '600', cursor: salvando ? 'not-allowed' : 'pointer', opacity: salvando ? 0.7 : 1 }}
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