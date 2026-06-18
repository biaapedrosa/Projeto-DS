import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import planoService from '../../services/planoService';

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
    novas[ri].opcoes[oi].alimentos.push({ nome: '' });
    setRefeicoes(novas);
  };
  const updateAlimento = (ri, oi, ai, valor) => {
    const novas = [...refeicoes];
    novas[ri].opcoes[oi].alimentos[ai].nome = valor;
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

  const btnSecundario = { background: '#eef4ef', color: '#2d6a4f', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' };
  const inputStyle = { padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto', zIndex: 1000 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', borderRadius: '12px', padding: '32px', maxWidth: '700px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#1a1a1a', margin: 0 }}>Novo Plano Alimentar</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#888', lineHeight: 1 }}>×</button>
        </div>

        {erro && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#333' }}>Data do plano</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={{ ...inputStyle, width: '200px' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ color: '#555', margin: 0, fontSize: '15px' }}>Refeições</h3>
          <button onClick={addRefeicao} style={btnSecundario}>+ Refeição</button>
        </div>

        {refeicoes.length === 0 && <p style={{ color: '#888', fontSize: '14px' }}>Nenhuma refeição adicionada.</p>}

        <div style={{ display: 'grid', gap: '16px' }}>
          {refeicoes.map((refeicao, ri) => (
            <div key={ri} style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                <input
                  placeholder="Nome da refeição (ex: Café da manhã)"
                  value={refeicao.nome}
                  onChange={(e) => updateRefeicao(ri, 'nome', e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  type="number"
                  placeholder="Hora"
                  value={refeicao.horario}
                  onChange={(e) => updateRefeicao(ri, 'horario', e.target.value)}
                  style={{ ...inputStyle, width: '80px' }}
                />
                <button onClick={() => removeRefeicao(ri)} style={{ ...btnSecundario, background: '#ffebee', color: '#c62828' }}>Remover</button>
              </div>

              <div style={{ paddingLeft: '12px', borderLeft: '3px solid #eef4ef' }}>
                <button onClick={() => addOpcao(ri)} style={{ ...btnSecundario, marginBottom: '8px' }}>+ Opção</button>
                {refeicao.opcoes.map((opcao, oi) => (
                  <div key={oi} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <input
                        placeholder={`Opção ${oi + 1}`}
                        value={opcao.nome}
                        onChange={(e) => updateOpcao(ri, oi, e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button onClick={() => removeOpcao(ri, oi)} style={{ ...btnSecundario, background: '#ffebee', color: '#c62828' }}>×</button>
                    </div>
                    <div style={{ paddingLeft: '12px' }}>
                      <button onClick={() => addAlimento(ri, oi)} style={{ ...btnSecundario, marginBottom: '6px' }}>+ Alimento</button>
                      {opcao.alimentos.map((alimento, ai) => (
                        <div key={ai} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <input
                            placeholder="Alimento"
                            value={alimento.nome}
                            onChange={(e) => updateAlimento(ri, oi, ai, e.target.value)}
                            style={{ ...inputStyle, flex: 1 }}
                          />
                          <button onClick={() => removeAlimento(ri, oi, ai)} style={{ ...btnSecundario, background: '#ffebee', color: '#c62828' }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button onClick={onClose} style={{ ...btnSecundario, background: '#f0f0f0', color: '#555', padding: '10px 20px' }}>Cancelar</button>
          <button
            onClick={handleSalvar}
            disabled={salvando}
            style={{ background: '#2d6a4f', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            {salvando ? 'Salvando...' : 'Salvar plano'}
          </button>
        </div>
      </div>
    </div>
  );
}