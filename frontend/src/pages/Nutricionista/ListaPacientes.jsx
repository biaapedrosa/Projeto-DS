import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pacienteService from '../../services/pacienteService';

export default function ListaPacientes() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await pacienteService.getAll();
        setPacientes(data);
      } catch (err) {
        setErro('Erro ao carregar pacientes.');
      } finally {
        setCarregando(false);
      }
    };
    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase();
    return (
        p.nome?.toLowerCase().includes(termo) ||
        p.email?.toLowerCase().includes(termo)
    );
  });

  return (
    <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#2d6a4f', margin: 0 }}>Meus Pacientes</h2>
        <button
          onClick={() => navigate('/nutricionista/cadastrar-paciente')}
          style={{ background: '#2d6a4f', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          + Cadastrar Paciente
        </button>
      </div>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por nome ou e-mail..."
        style={{ width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '24px' }}
      />

      {carregando && <p style={{ color: '#888' }}>Carregando pacientes...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!carregando && !erro && pacientesFiltrados.length === 0 && (
        <p style={{ color: '#888' }}>Nenhum paciente encontrado.</p>
      )}

      <div style={{ display: 'grid', gap: '12px' }}>
        {pacientesFiltrados.map((paciente) => (
          <div
            key={paciente.id}
            onClick={() => navigate(`/nutricionista/paciente/${paciente.id}`)}
            style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a1a' }}>{paciente.nome}</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{paciente.email}</div>
            </div>
            <span style={{ color: '#2d6a4f', fontSize: '20px' }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}