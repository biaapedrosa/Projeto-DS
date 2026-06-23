import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import planoService from '../../../services/planoService';
import { ArrowLeft } from 'lucide-react';

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

  if (carregando) return <div className="p-8">Carregando plano...</div>;
  if (erro) return <div className="p-8 text-red-600">{erro}</div>;
  if (!plano) return <div className="p-8">Plano não encontrado.</div>;

  return (
    <div className="mx-auto max-w-[800px] p-8">
      <button
        onClick={() => navigate(`/nutricionista/paciente/${id}`)}
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-sm text-nutri"
      >
        <ArrowLeft size={16} /> Voltar ao prontuário
      </button>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="m-0 text-[#1a1a1a]">
          Plano de {new Date(plano.data).toLocaleDateString('pt-BR')}
        </h2>
        <button
          onClick={handleExcluir}
          disabled={excluindo}
          className="cursor-pointer rounded-lg border-0 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-70"
        >
          {excluindo ? 'Excluindo...' : 'Excluir plano'}
        </button>
      </div>

      {(!plano.refeicoes || plano.refeicoes.length === 0) ? (
        <p className="text-[#888]">Nenhuma refeição cadastrada neste plano.</p>
      ) : (
        <div className="grid gap-4">
          {plano.refeicoes.map((refeicao) => (
            <div key={refeicao.id} className="rounded-xl border border-[#e0e0e0] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="m-0 text-base text-nutri">{refeicao.nome}</h3>
                {refeicao.horario != null && (
                  <span className="text-[13px] text-[#888]">{String(refeicao.horario).padStart(2, '0')}h</span>
                )}
              </div>

              {(!refeicao.opcoes || refeicao.opcoes.length === 0) ? (
                <p className="m-0 text-[13px] text-[#aaa]">Sem opções.</p>
              ) : (
                refeicao.opcoes.map((opcao, oi) => (
                  <div key={opcao.id || oi} className="mb-2 border-l-[3px] border-[#eef4ef] pl-3">
                    <div className="text-sm font-semibold text-[#333]">{opcao.nome || `Opção ${oi + 1}`}</div>
                    <ul className="mt-1 list-disc pl-[18px] text-[13px] text-[#666]">
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