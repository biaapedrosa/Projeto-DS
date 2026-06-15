const prisma = require('../db');

const consultaInclude = {
  historia_clinica: true,
  estilo_vida: true,
  funcao_intestinal: true,
  exames: true,
  antropometria: true,
};

const findByPacienteId = (paciente_id) =>
  prisma.consulta.findMany({
    where: { paciente_id: Number(paciente_id) },
    include: consultaInclude,
    orderBy: { data_consulta: 'desc' },
  });

const findById = (id) =>
  prisma.consulta.findUnique({
    where: { id: Number(id) },
    include: consultaInclude,
  });

const create = ({ paciente_id, nutricionista_id, data_consulta, objetivo_historia }) =>
  prisma.consulta.create({
    data: {
      paciente_id: Number(paciente_id),
      nutricionista_id: Number(nutricionista_id),
      data_consulta: new Date(data_consulta),
      objetivo_historia: objetivo_historia ?? null,
    },
    include: consultaInclude,
  });

const upsertHistoriaClinica = (consulta_id, dados) =>
  prisma.historiaClinica.upsert({
    where: { consulta_id: Number(consulta_id) },
    create: { consulta_id: Number(consulta_id), ...dados },
    update: dados,
  });

const upsertEstiloVida = (consulta_id, dados) =>
  prisma.estiloVida.upsert({
    where: { consulta_id: Number(consulta_id) },
    create: { consulta_id: Number(consulta_id), ...dados },
    update: dados,
  });

const upsertFuncaoIntestinal = (consulta_id, dados) =>
  prisma.funcaoIntestinalUrinaria.upsert({
    where: { consulta_id: Number(consulta_id) },
    create: { consulta_id: Number(consulta_id), ...dados },
    update: dados,
  });

const upsertExameBioquimico = async (consulta_id, dados) => {
  const existing = await prisma.exameBioquimico.findFirst({
    where: { consulta_id: Number(consulta_id) },
  });
  if (existing) {
    return prisma.exameBioquimico.update({
      where: { id: existing.id },
      data: dados,
    });
  }
  return prisma.exameBioquimico.create({
    data: { consulta_id: Number(consulta_id), ...dados },
  });
};

module.exports = {
  findByPacienteId,
  findById,
  create,
  upsertHistoriaClinica,
  upsertEstiloVida,
  upsertFuncaoIntestinal,
  upsertExameBioquimico,
};