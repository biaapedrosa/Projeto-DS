import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import planoService from '../../services/planoService';

export default function DetalhePlano() {
  const { id, planoId } = useParams();
  const navigate = useNavigate();
  const [plano, setPlano] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    const fetchPlano = async () => {
      try {
        const data = await planoService.getById(planoId);
        setPlano(data);
      } catch (err) {
        setErro('Erro ao carregar o plano.');
      } finally {
        setCarregando(false);
      }
    };
    fetchPlano();
  }, [planoId]);

  const handleExcluir = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este plano?')) return;
    setExcluindo(true);
    try {
      await planoService.remove(planoId);
      navigate(`/nutricionista/paciente/${id}`);
    } catch (err) {
      setErro('Erro ao excluir o plano.');
      setExcluindo(false);
    }
  };

  if (carregando) return <div style={{ padding: '32px' }}>Carregando plano...</div>;
  if (erro) return <div style={{ padding: '32px', color: 'red' }}>{erro}</div>;
  if (!plano) return <div style={{ padding: '32px' }}>Plano não encontrado.</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(`/nutricionista/paciente/${id}`)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d6a4f', fontSize: '14px', marginBottom: '16px' }}
      >
        ← Voltar ao prontuário
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#1a1a1a', margin: 0 }}>
          Plano de {new Date(plano.data).toLocaleDateString('pt-BR')}
        </h2>
        <button
          onClick={handleExcluir}
          disabled={excluindo}
          style={{ background: '#ffebee', color: '#c62828', padding: '10px 20px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          {excluindo ? 'Excluindo...' : 'Excluir plano'}
        </button>
      </div>

      {(!plano.refeicoes || plano.refeicoes.length === 0) ? (
        <p style={{ color: '#888' }}>Nenhuma refeição cadastrada neste plano.</p>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {plano.refeicoes.map((refeicao) => (
            <div key={refeicao.id} style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ color: '#2d6a4f', margin: 0, fontSize: '16px' }}>{refeicao.nome}</h3>
                {refeicao.horario != null && (
                  <span style={{ fontSize: '13px', color: '#888' }}>{String(refeicao.horario).padStart(2, '0')}h</span>
                )}
              </div>

              {(!refeicao.opcoes || refeicao.opcoes.length === 0) ? (
                <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>Sem opções.</p>
              ) : (
                refeicao.opcoes.map((opcao, oi) => (
                  <div key={opcao.id || oi} style={{ marginBottom: '8px', paddingLeft: '12px', borderLeft: '3px solid #eef4ef' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{opcao.nome || `Opção ${oi + 1}`}</div>
                    <ul style={{ margin: '4px 0 0', paddingLeft: '18px', color: '#666', fontSize: '13px' }}>
                      {(opcao.alimentos || []).map((alimento, ai) => (
                        <li key={alimento.id || ai}>{alimento.nome}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}