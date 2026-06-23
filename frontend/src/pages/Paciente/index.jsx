import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import planoService from '../../services/planoService';
import pacienteService from '../../services/pacienteService';
import { Leaf, AlertTriangle, Salad, ClipboardList, Target, Calendar, FolderClock, ArrowRight } from 'lucide-react';

const VERDE = '#2d6a4f';
const VERDE_CLARO = '#4CAF7D';

export default function PacienteDashboard() {
  const { user } = useAuth();

  const [planos, setPlanos] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!user?.id) { setCarregando(false); return; }
    const carregar = async () => {
      try {
        const [dadosPlanos, dadosPerfil] = await Promise.allSettled([
          planoService.getByPaciente(user.id),
          pacienteService.getById(user.id),
        ]);
        if (dadosPlanos.status === 'fulfilled') setPlanos(dadosPlanos.value || []);
        if (dadosPerfil.status === 'fulfilled') setPerfil(dadosPerfil.value);
        if (dadosPlanos.status === 'rejected' && dadosPerfil.status === 'rejected') {
          setErro('Não foi possível carregar seus dados no momento.');
        }
      } catch {
        setErro('Não foi possível carregar seus dados no momento.');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [user]);

  const nome = perfil?.nome || user?.nome || user?.email?.split('@')[0] || 'Paciente';
  const primeiroNome = nome.split(' ')[0];
  const iniciais = nome.split(' ').slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');

  const fmtData = (p) => {
    const d = p?.data_criacao || p?.created_at || p?.data;
    return d ? new Date(d).toLocaleDateString('pt-BR') : '—';
  };

  // O plano "atual" é o marcado como ativo (modo demo) ou, na ausência desse
  // campo (schema real só tem data + refeições), o mais recente por data.
  const dataPlano = (p) => new Date(p?.data_criacao || p?.created_at || p?.data || 0).getTime();
  const planosOrdenados = [...planos].sort((a, b) => dataPlano(b) - dataPlano(a));
  const planoAtual = planos.find((p) => p.status === 'ativo') || planosOrdenados[0] || null;
  const planosAntigos = planosOrdenados.filter((p) => p.id !== planoAtual?.id);

  const cards = [
    { Icon: Salad, rotulo: 'Plano ativo', valor: planoAtual ? 'Em andamento' : 'Nenhum', cor: planoAtual ? VERDE_CLARO : '#b0b0b0' },
    { Icon: ClipboardList, rotulo: 'Total de planos', valor: carregando ? '—' : planos.length, cor: '#3b82f6' },
    { Icon: Target, rotulo: 'Seu objetivo', valor: perfil?.objetivo || 'A definir', cor: '#e9a13b' },
  ];

  return (
    <div className="min-h-full bg-nutri-surface px-6 py-10">
      <div className="mx-auto max-w-[1000px]">

        {/* Cabeçalho de boas-vindas */}
        <div className="flex animate-fade-up flex-wrap items-center justify-between gap-4 rounded-[20px] bg-gradient-to-br from-nutri to-nutri-dark p-8 text-white shadow-[0_12px_28px_rgba(45,106,79,0.25)]">
          <div className="flex items-center gap-[18px]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/35 bg-white/[0.18] text-2xl font-extrabold">
              {iniciais || <Leaf size={26} color="white" />}
            </div>
            <div>
              <p className="text-sm opacity-85">Bem-vindo de volta,</p>
              <h1 className="mt-0.5 font-serif text-[28px] font-extrabold">{primeiroNome}</h1>
              <p className="mt-1 text-[13px] opacity-80">{perfil?.email || user?.email}</p>
            </div>
          </div>
        </div>

        {erro && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#fff4e5] px-[18px] py-3.5 text-sm text-[#9a5b00]">
            <AlertTriangle size={18} /> {erro}
          </div>
        )}

        {/* Cards de resumo */}
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {cards.map(({ Icon, rotulo, valor, cor }, i) => (
            <div
              key={i}
              className="animate-fade-up rounded-2xl bg-white p-[22px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
              style={{ borderLeft: `4px solid ${cor}` }}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${cor}1a` }}>
                <Icon size={24} color={cor} strokeWidth={2} />
              </div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#888]">{rotulo}</p>
              <p className="mt-1 text-lg font-bold leading-tight text-[#1a1a1a]">{valor}</p>
            </div>
          ))}
        </div>

        {/* Plano atual em destaque */}
        <div className="mt-8 animate-fade-up [animation-delay:160ms]">
          <h2 className="mb-4 font-serif text-xl text-[#1a1a1a]">Seu plano atual</h2>

          {carregando ? (
            <SkeletonCard />
          ) : planoAtual ? (
            <div className="rounded-[18px] border-2 border-nutri bg-gradient-to-br from-[#f0fdf4] to-white p-7 shadow-[0_6px_20px_rgba(45,106,79,0.10)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-nutri-100 px-3 py-1.5 text-xs font-bold text-nutri">● Ativo</span>
                  <h3 className="mb-1.5 mt-3.5 text-xl text-[#1a1a1a]">Plano alimentar #{planoAtual.id}</h3>
                  <p className="max-w-[560px] text-[15px] text-[#555]">
                    {planoAtual.descricao || 'Plano personalizado pela sua nutricionista.'}
                  </p>
                  <p className="mt-3.5 flex items-center gap-1.5 text-[13px] text-[#888]">
                    <Calendar size={15} /> Criado em {fmtData(planoAtual)}
                  </p>
                </div>
              </div>

              {/* Detalhes do plano: refeições, opções e alimentos */}
              {planoAtual.refeicoes?.length > 0 ? (
                <div className="mt-5 border-t border-nutri-100 pt-4">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-nutri">Refeições do plano</h4>
                  <div className="grid gap-3">
                    {planoAtual.refeicoes.map((ref, ri) => (
                      <div key={ref.id || ri} className="rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-bold text-[#1a1a1a]">{ref.nome || `Refeição ${ri + 1}`}</span>
                          {ref.horario != null && (
                            <span className="text-[13px] text-[#888]">{String(ref.horario).padStart(2, '0')}h</span>
                          )}
                        </div>
                        {(ref.opcoes || []).length === 0 ? (
                          <p className="m-0 text-[13px] text-[#aaa]">Sem opções cadastradas.</p>
                        ) : (
                          ref.opcoes.map((op, oi) => (
                            <div key={op.id || oi} className="mb-2 border-l-[3px] border-nutri-100 pl-3 last:mb-0">
                              <div className="text-[13px] font-semibold text-[#555]">{op.nome || `Opção ${oi + 1}`}</div>
                              <ul className="mt-1 list-disc pl-[18px] text-[13px] text-[#666]">
                                {(op.alimentos || []).map((al, ai) => (
                                  <li key={al.id || ai}>{al.nome}</li>
                                ))}
                              </ul>
                            </div>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-5 border-t border-nutri-100 pt-4 text-sm text-[#888]">
                  Este plano ainda não tem refeições cadastradas.
                </p>
              )}
            </div>
          ) : (
            <EmptyState
              Icon={Salad}
              titulo="Nenhum plano ativo ainda"
              texto="Quando sua nutricionista criar um plano alimentar, ele aparecerá aqui."
            />
          )}
        </div>

        {/* Histórico resumido */}
        <div className="mt-8 animate-fade-up [animation-delay:240ms]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#1a1a1a]">Histórico de planos</h2>
            {planosAntigos.length > 0 && (
              <Link to="/historico" className="inline-flex items-center gap-1 text-sm font-semibold text-nutri no-underline">
                Ver tudo <ArrowRight size={15} />
              </Link>
            )}
          </div>

          {carregando ? (
            <SkeletonCard />
          ) : planosAntigos.length === 0 ? (
            <EmptyState Icon={FolderClock} titulo="Sem histórico" texto="Seus planos anteriores ficarão guardados aqui." />
          ) : (
            <div className="grid gap-3">
              {planosAntigos.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-[14px] bg-white px-[22px] py-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
                >
                  <div>
                    <div className="font-bold text-[#1a1a1a]">Plano #{p.id}</div>
                    <div className="mt-0.5 text-[13px] text-[#888]">{p.descricao || 'Plano alimentar'}</div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-[13px] text-[#999]">{fmtData(p)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cartão de perfil */}
        <div className="mt-8 animate-fade-up [animation-delay:320ms]">
          <h2 className="mb-4 font-serif text-xl text-[#1a1a1a]">Meus dados</h2>
          <div className="rounded-2xl bg-white p-[26px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
              <Campo rotulo="Nome" valor={perfil?.nome || nome} />
              <Campo rotulo="E-mail" valor={perfil?.email || user?.email} />
              <Campo rotulo="Telefone / WhatsApp" valor={perfil?.telefone_whatsapp} />
              <Campo rotulo="Ocupação" valor={perfil?.ocupacao} />
              <Campo rotulo="Idade" valor={perfil?.idade ? `${perfil.idade} anos` : null} />
              <Campo rotulo="Objetivo" valor={perfil?.objetivo} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Campo({ rotulo, valor }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#999]">{rotulo}</p>
      <p className={`mt-1 text-[15px] font-medium ${valor ? 'text-[#1a1a1a]' : 'text-[#bbb]'}`}>{valor || '—'}</p>
    </div>
  );
}

function EmptyState({ Icon, titulo, texto }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d4e2d8] bg-white px-6 py-10 text-center">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f7f2]">
        {Icon && <Icon size={30} color="#4CAF7D" strokeWidth={2} />}
      </div>
      <h3 className="mb-1.5 text-[17px] text-[#1a1a1a]">{titulo}</h3>
      <p className="text-sm text-[#888]">{texto}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="mb-3.5 h-3.5 w-[30%] animate-fade-in rounded-md bg-[#eef3ee]" />
      <div className="mb-2.5 h-5 w-[60%] animate-fade-in rounded-md bg-[#eef3ee]" />
      <div className="h-3.5 w-[80%] animate-fade-in rounded-md bg-[#f3f6f3]" />
    </div>
  );
}