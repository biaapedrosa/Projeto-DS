import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import planoService from '../../services/planoService';
import { Leaf, CalendarDays, Bell, ChevronRight, Utensils } from 'lucide-react';

const formatarData = (data) => {
  if (!data) return '—';
  const d = new Date(data);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

const contarRefeicoes = (plano) => plano?.refeicoes?.length ?? 0;

export default function PacienteDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    let ativo = true;
    const carregar = async () => {
      setCarregando(true);
      setErro('');
      try {
        const data = await planoService.getByPaciente(user.id);
        if (ativo) setPlanos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (ativo) setErro('Não foi possível carregar seus planos. Tente novamente mais tarde.');
      } finally {
        if (ativo) setCarregando(false);
      }
    };

    carregar();
    return () => { ativo = false; };
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // A API retorna os planos ordenados por data (mais recente primeiro).
  const planoAtual = planos[0] ?? null;
  const planosAntigos = planos.slice(1);

  // Notificações derivadas dos planos mais recentes.
  const notificacoes = planos.slice(0, 3).map((plano, i) => ({
    id: plano.id,
    titulo: i === 0 ? 'Seu plano alimentar foi atualizado' : 'Plano alimentar registrado',
    data: plano.data,
  }));

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fdf9', minHeight: '100%' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 32px 64px' }}>

        {/* Cabeçalho */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div>
            <span style={{ background: '#e8f5e9', color: '#2d6a4f', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
              Área do paciente
            </span>
            <h1 style={{ fontSize: '34px', fontWeight: '800', color: '#1a1a1a', margin: '14px 0 4px', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Olá, {user?.nome || 'paciente'} 👋
            </h1>
            <p style={{ margin: 0, color: '#888' }}>{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#555' }}
          >
            Sair
          </button>
        </div>

        {carregando && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#888', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            Carregando seus planos...
          </div>
        )}

        {!carregando && erro && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '16px 20px', borderRadius: '12px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        {!carregando && !erro && (
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Coluna principal */}
            <div style={{ flex: '1 1 520px', minWidth: '300px' }}>

              {/* Plano atual em destaque */}
              <h2 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 12px' }}>Plano atual</h2>
              {planoAtual ? (
                <div style={{ background: 'white', border: '2px solid #2d6a4f', borderRadius: '16px', padding: '28px', boxShadow: '0 8px 24px rgba(45,106,79,0.08)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#2d6a4f', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>
                    <Leaf size={13} /> Plano em vigor
                  </span>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', color: '#555', fontSize: '14px', marginBottom: '20px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <CalendarDays size={16} color="#2d6a4f" /> {formatarData(planoAtual.data)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Utensils size={16} color="#2d6a4f" /> {contarRefeicoes(planoAtual)} refeições
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/paciente/plano/${planoAtual.id}`)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#2d6a4f', color: 'white', padding: '12px 22px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Ver plano completo <ChevronRight size={17} />
                  </button>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#888', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥗</div>
                  <p style={{ margin: 0 }}>Você ainda não possui um plano alimentar.</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px' }}>Seu nutricionista irá disponibilizá-lo em breve.</p>
                </div>
              )}

              {/* Histórico de planos */}
              {planosAntigos.length > 0 && (
                <>
                  <h2 style={{ fontSize: '20px', color: '#1a1a1a', margin: '36px 0 12px' }}>Histórico de planos</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {planosAntigos.map((plano) => (
                      <button
                        key={plano.id}
                        onClick={() => navigate(`/paciente/plano/${plano.id}`)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', background: 'white', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '18px 20px', cursor: 'pointer' }}
                      >
                        <div>
                          <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#1a1a1a' }}>{formatarData(plano.data)}</p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{contarRefeicoes(plano)} refeições</p>
                        </div>
                        <ChevronRight size={18} color="#999" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Coluna de notificações */}
            <aside style={{ flex: '1 1 260px', minWidth: '240px' }}>
              <h2 style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} color="#2d6a4f" /> Notificações
              </h2>
              <div style={{ background: 'white', borderRadius: '16px', padding: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                {notificacoes.length === 0 ? (
                  <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '24px 12px', margin: 0 }}>
                    Nenhuma notificação por enquanto.
                  </p>
                ) : (
                  notificacoes.map((n, i) => (
                    <div
                      key={n.id}
                      style={{ display: 'flex', gap: '12px', padding: '14px 12px', borderBottom: i < notificacoes.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2d6a4f', marginTop: '6px', flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{n.titulo}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>{formatarData(n.data)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
