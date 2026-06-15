import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import planoService from '../../services/planoService';

export default function CriarPlano() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const hoje = new Date().toISOString().split('T')[0];
  const [data, setData] = useState(hoje);
  const [refeicoes, setRefeicoes] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // REFEIÇÕES
  const addRefeicao = () => {
    setRefeicoes([...refeicoes, { nome: '', horario: '', opcoes: [] }]);
  };
  const updateRefeicao = (i, campo, valor) => {
    const novas = [...refeicoes];
    novas[i][campo] = valor;
    setRefeicoes(novas);
  };
  const removeRefeicao = (i) => {
    setRefeicoes(refeicoes.filter((_, idx) => idx !== i));
  };

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
    if (!data) {
      setErro('Informe a data do plano.');
      return;
    }
    if (refeicoes.length === 0) {
      setErro('Adicione ao menos uma refeição.');
      return;
    }

    const payload = {
      paciente_id: Number(id),
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
      navigate(`/nutricionista/paciente/${id}`);
    } catch (err) {
      setErro('Erro ao salvar o plano. Verifique os dados e tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const btnSecundario = { background: '#eef4ef', color: '#2d6a4f', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' };
  const inputStyle = { padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(`/nutricionista/paciente/${id}`)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d6a4f', fontSize: '14px', marginBottom: '16px' }}
      >
        ← Voltar ao prontuário
      </button>

      <h2 style={{ color: '#1a1a1a', marginBottom: '24px' }}>Novo Plano Alimentar</h2>

      {erro && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {erro}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#333', fontSize: '14px' }}>Data do plano</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={inputStyle} />
      </div>

      {refeicoes.map((refeicao, ri) => (
        <div key={ri} style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
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
            <button onClick={() => removeRefeicao(ri)} style={{ ...btnSecundario, color: '#c62828', background: '#ffebee' }}>Remover</button>
          </div>

          {refeicao.opcoes.map((opcao, oi) => (
            <div key={oi} style={{ marginLeft: '16px', borderLeft: '2px solid #eef4ef', paddingLeft: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  placeholder="Nome da opção (ex: Opção 1)"
                  value={opcao.nome}
                  onChange={(e) => updateOpcao(ri, oi, e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={() => removeOpcao(ri, oi)} style={{ ...btnSecundario, color: '#c62828', background: '#ffebee' }}>×</button>
              </div>

              {opcao.alimentos.map((alimento, ai) => (
                <div key={ai} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', marginLeft: '16px' }}>
                  <input
                    placeholder="Alimento (ex: Pão integral)"
                    value={alimento.nome}
                    onChange={(e) => updateAlimento(ri, oi, ai, e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button onClick={() => removeAlimento(ri, oi, ai)} style={{ ...btnSecundario, color: '#c62828', background: '#ffebee' }}>×</button>
                </div>
              ))}

              <button onClick={() => addAlimento(ri, oi)} style={{ ...btnSecundario, marginLeft: '16px' }}>+ Alimento</button>
            </div>
          ))}

          <button onClick={() => addOpcao(ri)} style={{ ...btnSecundario, marginLeft: '16px' }}>+ Opção</button>
        </div>
      ))}

      <button onClick={addRefeicao} style={{ ...btnSecundario, marginBottom: '24px' }}>+ Adicionar refeição</button>

      <div>
        <button
          onClick={handleSalvar}
          disabled={salvando}
          style={{ background: '#2d6a4f', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: salvando ? 'default' : 'pointer', opacity: salvando ? 0.7 : 1 }}
        >
          {salvando ? 'Salvando...' : 'Salvar plano'}
        </button>
      </div>
    </div>
  );
}