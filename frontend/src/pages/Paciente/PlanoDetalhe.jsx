import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import planoService from '../../services/planoService';
import { ArrowLeft, Clock, CalendarDays, Flame } from 'lucide-react';

const formatarData = (data) => {
  if (!data) return '—';
  const d = new Date(data);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

// horario é um inteiro no banco. Aceita hora do dia (8 -> 08:00) ou HHMM (730 -> 07:30).
const formatarHorario = (horario) => {
  if (horario === null || horario === undefined) return null;
  const h = Number(horario);
  if (isNaN(h)) return null;
  if (h >= 100) {
    const hh = Math.floor(h / 100);
    const mm = h % 100;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  return `${String(h).padStart(2, '0')}:00`;
};

// Lê porção/calorias de forma tolerante (campos opcionais no alimento).
const porcaoDe = (alimento) => alimento.porcao ?? alimento.quantidade ?? alimento.medida ?? null;
const caloriasDe = (alimento) => {
  const valor = alimento.calorias ?? alimento.kcal ?? alimento.energia_kcal;
  if (valor === null || valor === undefined) return null;
  const n = Number(valor);
  return isNaN(n) ? null : n;
};

const ordenarRefeicoes = (refeicoes = []) =>
  [...refeicoes].sort((a, b) => {
    const ha = a.horario ?? Number.MAX_SAFE_INTEGER;
    const hb = b.horario ?? Number.MAX_SAFE_INTEGER;
    return ha - hb;
  });

export default function PlanoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plano, setPlano] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;
    const carregar = async () => {
      setCarregando(true);
      setErro('');
      try {
        const data = await planoService.getById(id);
        if (ativo) setPlano(data);
      } catch (err) {
        if (ativo) setErro('Não foi possível carregar este plano alimentar.');
      } finally {
        if (ativo) setCarregando(false);
      }
    };
    carregar();
    return () => { ativo = false; };
  }, [id]);

  const refeicoes = ordenarRefeicoes(plano?.refeicoes);

  // Total de calorias do dia (somente quando há dados de calorias nos alimentos).
  let totalCalorias = 0;
  let temCalorias = false;
  refeicoes.forEach((r) =>
    (r.opcoes ?? []).forEach((o) =>
      (o.alimentos ?? []).forEach((a) => {
        const c = caloriasDe(a);
        if (c !== null) { totalCalorias += c; temCalorias = true; }
      })
    )
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fdf9', minHeight: '100%' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '32px 32px 64px' }}>

        <button
          onClick={() => navigate('/paciente/dashboard')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#2d6a4f', fontSize: '15px', fontWeight: '600', cursor: 'pointer', padding: 0, marginBottom: '24px' }}
        >
          <ArrowLeft size={18} /> Voltar
        </button>

        {carregando && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#888', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            Carregando plano alimentar...
          </div>
        )}

        {!carregando && erro && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '16px 20px', borderRadius: '12px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        {!carregando && !erro && plano && (
          <>
            {/* Cabeçalho do plano */}
            <div style={{ background: 'white', border: '2px solid #2d6a4f', borderRadius: '16px', padding: '28px', marginBottom: '28px', boxShadow: '0 8px 24px rgba(45,106,79,0.08)' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 12px', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Plano Alimentar
              </h1>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', color: '#555', fontSize: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarDays size={16} color="#2d6a4f" /> {formatarData(plano.data)}
                </span>
                {plano.nutricionista?.nome && (
                  <span>Nutricionista: <strong>{plano.nutricionista.nome}</strong></span>
                )}
                {temCalorias && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={16} color="#2d6a4f" /> Total: <strong>{totalCalorias} kcal</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Refeições */}
            {refeicoes.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#888' }}>
                Este plano ainda não possui refeições cadastradas.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {refeicoes.map((refeicao) => {
                  const horario = formatarHorario(refeicao.horario);
                  return (
                    <section key={refeicao.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#2d6a4f', margin: 0 }}>{refeicao.nome}</h2>
                        {horario && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e8f5e9', color: '#2d6a4f', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                            <Clock size={14} /> {horario}
                          </span>
                        )}
                      </div>
                      {refeicao.descricao && (
                        <p style={{ margin: '0 0 12px', color: '#555', fontSize: '14px' }}>{refeicao.descricao}</p>
                      )}

                      {/* Opções da refeição */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                        {(refeicao.opcoes ?? []).map((opcao, idx) => (
                          <div key={opcao.id} style={{ border: '1px solid #eef2ee', borderRadius: '12px', padding: '16px', background: '#fafdfb' }}>
                            <p style={{ margin: '0 0 10px', fontWeight: '600', color: '#1a1a1a', fontSize: '14px' }}>
                              {opcao.nome || `Opção ${idx + 1}`}
                            </p>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {(opcao.alimentos ?? []).map((alimento) => {
                                const porcao = porcaoDe(alimento);
                                const calorias = caloriasDe(alimento);
                                return (
                                  <li key={alimento.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', fontSize: '14px', color: '#333', borderBottom: '1px dashed #e8e8e8', paddingBottom: '6px' }}>
                                    <span>
                                      • {alimento.nome}
                                      {porcao && <span style={{ color: '#888' }}> — {porcao}</span>}
                                    </span>
                                    {calorias !== null && (
                                      <span style={{ color: '#2d6a4f', fontWeight: '600', whiteSpace: 'nowrap' }}>{calorias} kcal</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                            {opcao.observacao && (
                              <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#999', fontStyle: 'italic' }}>{opcao.observacao}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {refeicao.observacao && (
                        <p style={{ margin: '14px 0 0', fontSize: '13px', color: '#777', background: '#f5f5f5', padding: '10px 14px', borderRadius: '8px' }}>
                          <strong>Observação:</strong> {refeicao.observacao}
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
