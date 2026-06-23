import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import fichaMedicaService from '../../services/fichaMedicaService';

// Rótulos amigáveis para os enums do backend (schema.prisma).
const LABELS = {
  bebida_alcoolica: {
    Nunca: 'Nunca', Uma_vez_mes: '1x por mês', Um_dois_mes: '1 a 2x por mês',
    Tres_quatro_mes: '3 a 4x por mês', Diariamente: 'Diariamente',
  },
  fuma: { Nunca: 'Nunca', Raramente: 'Raramente', Diariamente: 'Diariamente' },
  habito_intestinal: { Diario: 'Diário', Dias_alternados: 'Dias alternados', Mais_2_dias: 'Mais de 2 dias' },
  cor_urina: { Transparente: 'Transparente', Clara: 'Clara', Escura: 'Escura' },
};

const fmt = (v) => (v === null || v === undefined || v === '' ? '—' : v);
const fmtBool = (v) => (v ? 'Sim' : 'Não');
const fmtEnum = (campo, v) => (v ? LABELS[campo]?.[v] || v : '—');

function Linha({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="min-w-[200px] font-medium text-[#555]">{label}:</span>
      <span className="text-[#1a1a1a]">{children}</span>
    </div>
  );
}

function Secao({ titulo, children }) {
  return (
    <div className="mb-5 rounded-xl border border-[#e0e0e0] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <h3 className="mb-3 mt-0 text-[#2d6a4f]">{titulo}</h3>
      <div className="grid gap-2 text-sm">{children}</div>
    </div>
  );
}

export default function FichaMedicaDetalhe() {
  const { id, consultaId } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const dados = await fichaMedicaService.getById(consultaId);
        setConsulta(dados);
      } catch {
        setErro('Erro ao carregar a ficha médica.');
      } finally {
        setCarregando(false);
      }
    };
    fetchConsulta();
  }, [consultaId]);

  if (carregando) return <div className="p-8">Carregando ficha médica...</div>;
  if (erro) return <div className="p-8 text-red-600">{erro}</div>;
  if (!consulta) return <div className="p-8">Ficha não encontrada.</div>;

  const a = consulta.antropometria || {};
  const h = consulta.historia_clinica || {};
  const e = consulta.estilo_vida || {};
  const f = consulta.funcao_intestinal || {};

  return (
    <div className="mx-auto max-w-[900px] p-8">
      <button
        onClick={() => navigate(`/nutricionista/paciente/${id}`)}
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-sm text-nutri"
      >
        <ArrowLeft size={16} /> Voltar ao prontuário
      </button>

      <h2 className="mb-1 text-[#1a1a1a]">
        Ficha de {new Date(consulta.data_consulta).toLocaleDateString('pt-BR')}
      </h2>
      <p className="mb-6 text-[#888]">{consulta.paciente?.nome || ''}</p>

      <Secao titulo="Identificação">
        <Linha label="Objetivo / história">{fmt(consulta.objetivo_historia)}</Linha>
      </Secao>

      <Secao titulo="Antropometria">
        <Linha label="Pressão arterial">{fmt(a.pa)}</Linha>
        <Linha label="Altura (m)">{fmt(a.altura)}</Linha>
        <Linha label="Peso atual (kg)">{fmt(a.pp)}</Linha>
        <Linha label="IMC">{fmt(a.imc)}</Linha>
        <Linha label="Exame físico">{fmt(a.exame_fisico)}</Linha>
      </Secao>

      <Secao titulo="História clínica familiar">
        <Linha label="Diabetes">{fmtBool(h.hist_familiar_dm)}</Linha>
        <Linha label="Hipertensão">{fmtBool(h.hist_familiar_has)}</Linha>
        <Linha label="Doença cardiovascular">{fmtBool(h.hist_familiar_dvc)}</Linha>
        <Linha label="Câncer">{fmtBool(h.hist_familiar_cancer)}</Linha>
        <Linha label="Outras (família)">{fmt(h.hist_familiar_outras)}</Linha>
        <Linha label="Possui diagnóstico">{fmtBool(h.tem_diagnostico)}</Linha>
        {h.tem_diagnostico && <Linha label="Diagnósticos">{fmt(h.diagnosticos)}</Linha>}
      </Secao>

      <Secao titulo="Estilo de vida">
        <Linha label="Bebida alcoólica">{fmtEnum('bebida_alcoolica', e.bebida_alcoolica)}</Linha>
        <Linha label="Fuma">{fmtEnum('fuma', e.fuma)}</Linha>
        <Linha label="Atividade física">{fmt(e.atividade_fisica)}</Linha>
        <Linha label="Horas de sono">{fmt(e.horas_sono)}</Linha>
        <Linha label="Já fez dieta antes">{fmtBool(e.fez_dieta_antes)}</Linha>
      </Secao>

      <Secao titulo="Função intestinal e urinária">
        <Linha label="Hábito intestinal">{fmtEnum('habito_intestinal', f.habito_intestinal)}</Linha>
        <Linha label="Água por dia (L)">{fmt(f.agua_dia)}</Linha>
        <Linha label="Cor da urina">{fmtEnum('cor_urina', f.cor_urina)}</Linha>
        <Linha label="Alergias / intolerâncias">{fmt(f.alergia_intolerancia)}</Linha>
        <Linha label="Suplementos / medicamentos">{fmt(f.suplementos_medicamentos)}</Linha>
      </Secao>
    </div>
  );
}
