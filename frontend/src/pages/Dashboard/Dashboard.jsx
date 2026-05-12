// useEffect: executa código quando o componente é montado (ou quando dependências mudam)
// useState: guarda o estado local do componente (lista de planos e mensagem de erro)
import { useEffect, useState } from 'react';

// Importa o serviço de planos alimentares para buscar dados da API
import planoService from '../../services/planoService';

// Importa o componente que renderiza o card visual de cada plano
import PlanoCard from '../../components/PlanoCard/PlanoCard';

const Dashboard = () => {
  // Estado que guarda a lista de planos alimentares do paciente
  const [planos, setPlanos] = useState([]);

  // Estado para exibir uma mensagem de erro caso a requisição falhe
  const [erro, setErro] = useState('');

  // useEffect com array vazio [] — executa só uma vez, quando o componente é montado
  // É o lugar certo para fazer chamadas à API na inicialização da tela
  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        // ID fixo por enquanto — em produção deveria vir do usuário logado (req.user.id)
        const pacienteId = 2;
        const data = await planoService.getByPaciente(pacienteId);
        setPlanos(data); // atualiza o estado com os planos recebidos da API
      } catch (err) {
        setErro('Erro ao carregar planos.'); // exibe mensagem se a API falhar
      }
    };
    fetchPlanos();
  }, []); // [] significa que esse efeito só roda uma vez (na montagem do componente)

  // Separa o plano ativo (atual) dos planos antigos para exibição diferenciada
  const planoAtual = planos.find(p => p.status === 'ativo');
  const planosAntigos = planos.filter(p => p.status !== 'ativo');

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: '24px' }}>Meus Planos Alimentares</h2>

      {/* Exibe a mensagem de erro em vermelho se houver falha na requisição */}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Se não houver planos, exibe mensagem; caso contrário, renderiza os cards */}
      {planos.length === 0 ? (
        <p>Nenhum plano encontrado.</p>
      ) : (
        <>
          {/* Plano atual — destaque visual via prop tipo="atual" no PlanoCard */}
          {planoAtual && (
            <div>
              <h3 style={{ color: '#555', marginBottom: '12px' }}>Plano Atual</h3>
              <PlanoCard plano={planoAtual} tipo="atual" />
            </div>
          )}

          {/* Histórico de planos anteriores — aparece só se houver planos antigos */}
          {planosAntigos.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: '#555', marginBottom: '12px' }}>Histórico de Planos</h3>
              {/* key={plano.id} é obrigatório para o React identificar cada item da lista */}
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
