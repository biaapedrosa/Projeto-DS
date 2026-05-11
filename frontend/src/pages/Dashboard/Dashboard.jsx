import { useEffect, useState } from 'react';
import planoService from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard/PlanoCard';

const Dashboard = () => {
  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const pacienteId = 2;
        const data = await planoService.getByPaciente(pacienteId);
        setPlanos(data);
      } catch (err) {
        setErro('Erro ao carregar planos.');
      }
    };
    fetchPlanos();
  }, []);

  const planoAtual = planos.find(p => p.status === 'ativo');
  const planosAntigos = planos.filter(p => p.status !== 'ativo');

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: '24px' }}>Meus Planos Alimentares</h2>

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
    </div>
  );
};

export default Dashboard;