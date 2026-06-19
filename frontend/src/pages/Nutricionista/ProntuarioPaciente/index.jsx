import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pacienteService from '../../../services/pacienteService';
import ModalNovoPlano from '../../../components/ModalNovoPlano';
import { ArrowLeft } from 'lucide-react';

export default function ProntuarioPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [planos, setPlanos] = useState([]);
  const [aba, setAba] = useState('plano');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const carregarPlanos = async () => {
    const dadosPlanos = await pacienteService.getPlanos(id);
    setPlanos(dadosPlanos);
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [dadosPaciente, dadosPlanos] = await Promise.all([
          pacienteService.getById(id),
          pacienteService.getPlanos(id),
        ]);
        setPaciente(dadosPaciente);
        setPlanos(dadosPlanos);
      } catch (err) {
        setErro('Erro ao carregar o prontuário do paciente.');
      } finally {
        setCarregando(false);
      }
    };
    fetchDados();
  }, [id]);

  if (carregando) return <div className="p-8">Carregando prontuário...</div>;
  if (erro) return <div className="p-8 text-red-600">{erro}</div>;

  const abaClass = (ativa) =>
    `cursor-pointer rounded-lg border-0 px-5 py-2.5 text-sm font-semibold transition-colors ${
      ativa ? 'bg-nutri text-white' : 'bg-transparent text-[#555] hover:bg-nutri-100'
    }`;

  return (
    <div className="mx-auto max-w-[900px] p-8">
      <button
        onClick={() => navigate('/nutricionista/pacientes')}
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-sm text-nutri"
      >
        <ArrowLeft size={16} /> Voltar aos pacientes
      </button>

      <h2 className="mb-1 text-[#1a1a1a]">{paciente?.nome}</h2>
      <p className="mb-6 text-[#888]">{paciente?.email}</p>

      <div className="mb-6 flex gap-2 border-b border-[#e0e0e0] pb-3">
        <button className={abaClass(aba === 'anamnese')} onClick={() => setAba('anamnese')}>Anamnese</button>
        <button className={abaClass(aba === 'avaliacao')} onClick={() => setAba('avaliacao')}>Avaliação Antropométrica</button>
        <button className={abaClass(aba === 'plano')} onClick={() => setAba('plano')}>Plano Alimentar</button>
      </div>

      {aba === 'anamnese' && (
        <div className="grid gap-2 text-sm text-[#444]">
          <div><strong>Ocupação:</strong> {paciente?.ocupacao || '—'}</div>
          <div><strong>Objetivo:</strong> {paciente?.objetivo || '—'}</div>
          <div><strong>Vínculo UFPE:</strong> {paciente?.vinculo_ufpe || '—'}</div>
          <div><strong>Telefone/WhatsApp:</strong> {paciente?.telefone_whatsapp || '—'}</div>
        </div>
      )}

      {aba === 'avaliacao' && (
        <div className="grid gap-2 text-sm text-[#444]">
          <div><strong>Sexo:</strong> {paciente?.sexo || '—'}</div>
          <div><strong>Idade:</strong> {paciente?.idade || '—'}</div>
          <p className="mt-2 text-[#888]">
            Medidas antropométricas (peso, altura, etc.) dependem de campos ainda não disponíveis no model do paciente.
          </p>
        </div>
      )}

      {aba === 'plano' && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="m-0 text-[#555]">Planos alimentares</h3>
            <button
              onClick={() => setModalAberto(true)}
              className="cursor-pointer rounded-lg border-0 bg-nutri px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              + Novo Plano
            </button>
          </div>

          {planos.length === 0 ? (
            <p className="text-[#888]">Nenhum plano cadastrado para este paciente.</p>
          ) : (
            <div className="grid gap-3">
              {planos.map((plano) => (
                <div
                  key={plano.id}
                  onClick={() => navigate(`/nutricionista/paciente/${id}/plano/${plano.id}`)}
                  className="cursor-pointer rounded-xl border border-[#e0e0e0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(26,58,42,0.12)]"
                >
                  <div className="font-bold text-[#1a1a1a]">
                    Plano de {new Date(plano.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="mt-1 text-[13px] text-[#888]">
                    {plano.refeicoes?.length || 0} refeição(ões)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {modalAberto && (
        <ModalNovoPlano
          pacienteId={id}
          onClose={() => setModalAberto(false)}
          onSalvo={carregarPlanos}
        />
      )}
    </div>
  );
}