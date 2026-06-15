import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pacienteService from '../../services/pacienteService';

export default function ProntuarioPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [planos, setPlanos] = useState([]);
  const [aba, setAba] = useState('plano');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [dadosPaciente, dadosPlanos] = await Promise.all([
          pacienteService.getById(id),
          pacienteService.getPlanos(id),
        ]);
        setPaciente(dadosPaciente);
        setPlanos(dadosPlanos);
      } catch (err) {
        setErro('Erro ao carregar o prontuário do paciente.');
      } finally {
        setCarregando(false);
      }
    };
    fetchDados();
  }, [id]);

  if (carregando) return <div style={{ padding: '32px' }}>Carregando prontuário...</div>;
  if (erro) return <div style={{ padding: '32px', color: 'red' }}>{erro}</div>;

  const abaStyle = (ativa) => ({
    padding: '10px 20px',
    background: ativa ? '#2d6a4f' : 'transparent',
    color: ativa ? 'white' : '#555',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  });

  return (
    <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/nutricionista/pacientes')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d6a4f', fontSize: '14px', marginBottom: '16px' }}
      >
        ← Voltar aos pacientes
      </button>

      <h2 style={{ color: '#1a1a1a', margin: '0 0 4px' }}>{paciente?.nome}</h2>
      <p style={{ color: '#888', margin: '0 0 24px' }}>{paciente?.email}</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '12px' }}>
        <button style={abaStyle(aba === 'anamnese')} onClick={() => setAba('anamnese')}>Anamnese</button>
        <button style={abaStyle(aba === 'avaliacao')} onClick={() => setAba('avaliacao')}>Avaliação Antropométrica</button>
        <button style={abaStyle(aba === 'plano')} onClick={() => setAba('plano')}>Plano Alimentar</button>
      </div>

      {aba === 'anamnese' && (
        <p style={{ color: '#888' }}>Anamnese — em construção.</p>
      )}

      {aba === 'avaliacao' && (
        <p style={{ color: '#888' }}>Avaliação Antropométrica — em construção.</p>
      )}

      {aba === 'plano' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#555', margin: 0 }}>Planos alimentares</h3>
            <button
              onClick={() => navigate(`/nutricionista/paciente/${id}/novo-plano`)}
              style={{ background: '#2d6a4f', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              + Novo Plano
            </button>
          </div>

          {planos.length === 0 ? (
            <p style={{ color: '#888' }}>Nenhum plano cadastrado para este paciente.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {planos.map((plano) => (
                <div key={plano.id} style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontWeight: '700', color: '#1a1a1a' }}>
                    Plano de {new Date(plano.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                    {plano.refeicoes?.length || 0} refeição(ões)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}