import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import planoService from '../../services/planoService';
import { AlertTriangle, Sprout } from 'lucide-react';

const delays = ['[animation-delay:80ms]', '[animation-delay:160ms]', '[animation-delay:240ms]', '[animation-delay:320ms]'];

export default function Historico() {
  const { user } = useAuth();
  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!user?.id) { setCarregando(false); return; }
    const carregar = async () => {
      try {
        const dados = await planoService.getByPaciente(user.id);
        setPlanos(dados || []);
      } catch {
        setErro('Não foi possível carregar seu histórico no momento.');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [user]);

  const ordenados = [...planos].sort((a, b) => {
    const da = new Date(a.data_criacao || a.created_at || a.data || 0).getTime();
    const db = new Date(b.data_criacao || b.created_at || b.data || 0).getTime();
    return db - da;
  });

  const fmtData = (p) => {
    const d = p?.data_criacao || p?.created_at || p?.data;
    return d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Data não informada';
  };

  return (
    <div className="min-h-full bg-nutri-surface px-6 py-12">
      <div className="mx-auto max-w-[760px]">

        <div className="mb-8 animate-fade-up">
          <span className="rounded-full bg-nutri-100 px-3.5 py-1.5 text-[13px] font-bold text-nutri">
            Histórico
          </span>
          <h1 className="mb-1.5 mt-4 font-serif text-[34px] font-extrabold text-[#1a1a1a]">
            Sua jornada nutricional
          </h1>
          <p className="text-base text-[#666]">
            Acompanhe a evolução de todos os seus planos alimentares ao longo do tempo.
          </p>
        </div>

        {erro && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-[#fff4e5] px-[18px] py-3.5 text-sm text-[#9a5b00]">
            <AlertTriangle size={18} /> {erro}
          </div>
        )}

        {carregando ? (
          <p className="text-[#888]">Carregando histórico...</p>
        ) : ordenados.length === 0 ? (
          <div className="animate-fade-up rounded-[18px] border border-dashed border-[#d4e2d8] bg-white px-6 py-14 text-center">
            <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f0f7f2]">
              <Sprout size={34} color="#4CAF7D" strokeWidth={2} />
            </div>
            <h3 className="mb-1.5 text-[#1a1a1a]">Seu histórico está vazio</h3>
            <p className="mb-5 text-[#888]">Você ainda não possui planos alimentares registrados.</p>
            <Link
              to="/paciente/dashboard"
              className="inline-block rounded-[10px] bg-nutri px-6 py-3 font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Ir para o painel
            </Link>
          </div>
        ) : (
          <div className="relative pl-9">
            {/* linha da timeline */}
            <div className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-gradient-to-b from-nutri-light to-[#d4e2d8]" />

            {ordenados.map((p, i) => {
              const ativo = p.status === 'ativo';
              return (
                <div key={p.id} className={`relative mb-5 animate-fade-up ${delays[Math.min(i, 3)]}`}>
                  {/* marcador */}
                  <div
                    className={`absolute -left-[30px] top-[22px] h-4 w-4 rounded-full border-[3px] border-white ${
                      ativo ? 'bg-nutri-light shadow-[0_0_0_2px_#4CAF7D]' : 'bg-[#cdddd2] shadow-[0_0_0_2px_#cdddd2]'
                    }`}
                  />
                  <div
                    className={`rounded-2xl p-[22px] px-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)] ${
                      ativo ? 'border-2 border-nutri bg-gradient-to-br from-[#f0fdf4] to-white' : 'border border-[#e8ede9] bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${ativo ? 'bg-nutri-100 text-nutri' : 'bg-[#f0f0f0] text-[#777]'}`}>
                        {ativo ? '● Plano atual' : 'Plano anterior'}
                      </span>
                      <span className="text-[13px] text-[#999]">{fmtData(p)}</span>
                    </div>
                    <h3 className="mb-1.5 mt-3 text-lg text-[#1a1a1a]">Plano alimentar #{p.id}</h3>
                    <p className="text-sm text-[#555]">
                      {p.descricao || 'Plano personalizado pela sua nutricionista.'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}