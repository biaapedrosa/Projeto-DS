import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import planoService from '../../services/planoService';
import AutocompleteAlimento from '../AutocompleteAlimento';

export default function ModalNovoPlano({ pacienteId, onClose, onSalvo }) {
  const { user } = useAuth();
  const hoje = new Date().toISOString().split('T')[0];
  const [data, setData] = useState(hoje);
  const [refeicoes, setRefeicoes] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // REFEIÇÕES
  const addRefeicao = () => setRefeicoes([...refeicoes, { nome: '', horario: '', opcoes: [] }]);
  const updateRefeicao = (i, campo, valor) => {
    const novas = [...refeicoes];
    novas[i][campo] = valor;
    setRefeicoes(novas);
  };
  const removeRefeicao = (i) => setRefeicoes(refeicoes.filter((_, idx) => idx !== i));

  // OPÇÕES
  const addOpcao = (ri) => {
    const novas = [...refeicoes];
    novas[ri].opcoes.push({ nome: '', alimentos: [] });
    setRefeicoes(novas);
  };
  const updateOpcao = (ri, oi, valor) => {
    const novas = [...refeicoes];
    novas[ri].opcoes[oi].nome = valor;
    setRefeicoes(novas);
  };
  const removeOpcao = (ri, oi) => {
    const novas = [...refeicoes];
    novas[ri].opcoes = novas[ri].opcoes.filter((_, idx) => idx !== oi);
    setRefeicoes(novas);
  };

  // ALIMENTOS
  const addAlimento = (ri, oi) => {
    const novas = [...refeicoes];
    novas[ri].opcoes[oi].alimentos.push({ nome: '', alimento_taco_id: null });
    setRefeicoes(novas);
  };
  const selecionarAlimento = (ri, oi, ai, alimento) => {
    const novas = [...refeicoes];
    novas[ri].opcoes[oi].alimentos[ai] = {
      nome: alimento.descricao || '',
      alimento_taco_id: alimento.id ?? null,
    };
    setRefeicoes(novas);
  };
  const removeAlimento = (ri, oi, ai) => {
  const novas = [...refeicoes];
  novas[ri].opcoes[oi].alimentos = novas[ri].opcoes[oi].alimentos.filter((_, idx) => idx !== ai);
  setRefeicoes(novas);
  };

  // SALVAR
  const handleSalvar = async () => {
    setErro('');
    if (!data) { setErro('Informe a data do plano.'); return; }
    if (refeicoes.length === 0) { setErro('Adicione ao menos uma refeição.'); return; }

    const payload = {
      paciente_id: Number(pacienteId),
      nutricionista_id: user?.id,
      data,
      refeicoes: refeicoes.map((r) => ({
        nome: r.nome,
        horario: r.horario === '' ? null : Number(r.horario),
        opcoes: r.opcoes.map((o) => ({
          nome: o.nome,
          alimentos: o.alimentos
            .filter((a) => a.nome.trim() !== '')
            .map((a) => ({ nome: a.nome })),
        })),
      })),
    };

    setSalvando(true);
    try {
      await planoService.create(payload);
      onSalvo?.();
      onClose?.();
    } catch (err) {
      setErro('Erro ao salvar o plano. Verifique os dados e tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const btnSecundario = 'cursor-pointer rounded-md border-0 bg-[#eef4ef] px-3 py-1.5 text-[13px] font-semibold text-nutri';
  const btnRemover = 'cursor-pointer rounded-md border-0 bg-red-50 px-3 py-1.5 text-[13px] font-semibold text-red-700';
  const inputClass = 'box-border rounded-md border border-[#e0e0e0] px-3 py-2 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/45 px-4 py-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[700px] rounded-xl bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="m-0 text-[#1a1a1a]">Novo Plano Alimentar</h2>
          <button onClick={onClose} className="cursor-pointer border-0 bg-transparent text-[22px] leading-none text-[#888]">×</button>
        </div>

        {erro && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-semibold text-[#333]">Data do plano</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={`${inputClass} w-[200px]`} />
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 text-[15px] text-[#555]">Refeições</h3>
          <button onClick={addRefeicao} className={btnSecundario}>+ Refeição</button>
        </div>

        {refeicoes.length === 0 && <p className="text-sm text-[#888]">Nenhuma refeição adicionada.</p>}

        <div className="grid gap-4">
          {refeicoes.map((refeicao, ri) => (
            <div key={ri} className="rounded-[10px] border border-[#e0e0e0] p-4">
              <div className="mb-3 flex items-center gap-2">
                <input
                  placeholder="Nome da refeição (ex: Café da manhã)"
                  value={refeicao.nome}
                  onChange={(e) => updateRefeicao(ri, 'nome', e.target.value)}
                  className={`${inputClass} flex-1`}
                />
                <input
                  type="number"
                  placeholder="Hora"
                  value={refeicao.horario}
                  onChange={(e) => updateRefeicao(ri, 'horario', e.target.value)}
                  className={`${inputClass} w-20`}
                />
                <button onClick={() => removeRefeicao(ri)} className={btnRemover}>Remover</button>
              </div>

              <div className="border-l-[3px] border-[#eef4ef] pl-3">
                <button onClick={() => addOpcao(ri)} className={`${btnSecundario} mb-2`}>+ Opção</button>
                {refeicao.opcoes.map((opcao, oi) => (
                  <div key={oi} className="mb-3">
                    <div className="mb-1.5 flex gap-2">
                      <input
                        placeholder={`Opção ${oi + 1}`}
                        value={opcao.nome}
                        onChange={(e) => updateOpcao(ri, oi, e.target.value)}
                        className={`${inputClass} flex-1`}
                      />
                      <button onClick={() => removeOpcao(ri, oi)} className={btnRemover}>×</button>
                    </div>
                    <div className="pl-3">
                      <button onClick={() => addAlimento(ri, oi)} className={`${btnSecundario} mb-1.5`}>+ Alimento</button>
                      {opcao.alimentos.map((alimento, ai) => (
                        <div key={ai} className="mb-1.5 flex gap-2">
                          <AutocompleteAlimento
                            value={alimento.nome}
                            onSelect={(sel) => selecionarAlimento(ri, oi, ai, sel)}
                          />
                          <button onClick={() => removeAlimento(ri, oi, ai)} className={btnRemover}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="cursor-pointer rounded-md border-0 bg-[#f0f0f0] px-5 py-2.5 text-[13px] font-semibold text-[#555]">Cancelar</button>
          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="cursor-pointer rounded-lg border-0 bg-nutri px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
          >
            {salvando ? 'Salvando...' : 'Salvar plano'}
          </button>
        </div>
      </div>
    </div>
  );
}