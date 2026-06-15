const repo = require('../repositories/consultaRepository');

// Mapa de enums do Prisma para os valores do schema
const FREQ_BEBIDA_MAP = {
  '1x_mes': 'Uma_vez_mes',
  '1_2x_mes': 'Um_dois_mes',
  '3_4x_mes': 'Tres_quatro_mes',
  Nunca: 'Nunca',
  Diariamente: 'Diariamente',
};

const parseBool = (v) => {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false') return false;
  return null;
};

const parseFloat_ = (v) => (v !== '' && v != null ? parseFloat(v) : null);
const parseInt_ = (v) => (v !== '' && v != null ? parseInt(v, 10) : null);

const getByPaciente = (paciente_id) => repo.findByPacienteId(paciente_id);

const getById = (id) => repo.findById(id);

const create = async ({ paciente_id, nutricionista_id, data_consulta, objetivo_historia }) => {
  if (!paciente_id || !nutricionista_id || !data_consulta)
    throw new Error('paciente_id, nutricionista_id e data_consulta são obrigatórios.');
  return repo.create({ paciente_id, nutricionista_id, data_consulta, objetivo_historia });
};

const saveAnamnese = async (consulta_id, body) => {
  const consulta = await repo.findById(consulta_id);
  if (!consulta) throw new Error('Consulta não encontrada.');

  // Historia Clínica 
  await repo.upsertHistoriaClinica(consulta_id, {
    hist_familiar_dm: body.hist_familiar_dm ?? false,
    hist_familiar_has: body.hist_familiar_has ?? false,
    hist_familiar_dvc: body.hist_familiar_dvc ?? false,
    hist_familiar_cancer: body.hist_familiar_cancer ?? false,
    hist_familiar_outras: body.hist_familiar_outras || null,
    tem_diagnostico: parseBool(body.tem_diagnostico),
    diagnosticos: body.diagnosticos || null,
  });

  //  Estilo de Vida 
  const bebida = body.bebida_alcoolica
    ? FREQ_BEBIDA_MAP[body.bebida_alcoolica] || body.bebida_alcoolica
    : null;
  const fumo = body.fuma || null;

  await repo.upsertEstiloVida(consulta_id, {
    bebida_alcoolica: bebida,
    fuma: fumo,
    atividade_fisica: body.atividade_fisica || null,
    ativ_horario: body.ativ_horario || null,
    ativ_frequencia: body.ativ_frequencia || null,
    ativ_tempo: body.ativ_tempo || null,
    horas_sono: parseFloat_(body.horas_sono),
    horario_mais_fome: body.horario_mais_fome || null,
    fez_dieta_antes: parseBool(body.fez_dieta_antes),
  });

  // Função Intestinal 
  await repo.upsertFuncaoIntestinal(consulta_id, {
    habito_intestinal: body.habito_intestinal || null,
    escala_bristol: parseInt_(body.escala_bristol),
    agua_dia: parseFloat_(body.agua_dia),
    cor_urina: body.cor_urina || null,
    queixa_constipacao: body.queixa_constipacao ?? false,
    queixa_dores: body.queixa_dores ?? false,
    queixa_azia_refluxo: body.queixa_azia_refluxo ?? false,
    queixa_flatulencia: body.queixa_flatulencia ?? false,
    queixa_outras: body.queixa_outras || null,
    alergia_intolerancia: body.alergia_intolerancia || null,
    suplementos_medicamentos: body.suplementos_medicamentos || null,
  });

  // Exame Bioquímico 
  const camposExame = ['hb','ht','vcm','hcm','chcm','rdw','hba1c','tgc','tgo','tgp',
    'ur','cr','ac_ur','vit_d','ct','hdl','ldl','vldl','gj','vit_b12'];
  const exameData = {};
  camposExame.forEach((c) => { exameData[c] = parseFloat_(body[c]); });
  if (body.data_exame) exameData.data_exame = new Date(body.data_exame);

  await repo.upsertExameBioquimico(consulta_id, exameData);

  return repo.findById(consulta_id);
};

module.exports = { getByPaciente, getById, create, saveAnamnese };