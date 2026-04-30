import { useEffect, useState } from 'react';
import planoService from '../../services/planoService';
import PlanoCard from '../../components/PlanoCard/PlanoCard';
import NavBar from '../../components/NavBar/NavBar';

const Dashboard = () => {
  const [planos, setPlanos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const pacienteId = 1; // substituir pelo id do usuário logado futuramente
        const data = await planoService.getByPaciente(pacienteId);
        setPlanos(data);
      } catch (err) {
        setErro('Erro ao carregar planos.');
      }
    };
    fetchPlanos();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <h2>Meus Planos Alimentares</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {planos.length === 0 ? (
          <p>Nenhum plano encontrado.</p>
        ) : (
          planos.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;