const prisma = require('../db');

const consultaInclude = {
  antropometria: true,
  historia_clinica: true,
  estilo_vida: true,
  funcao_intestinal: true,
  exames: true,
};

const buildOneToOneCreate = (obj) => {
  if (!obj || typeof obj !== 'object') return undefined;
  return { create: obj };
};

const buildExamesCreate = (exames) => {
  if (!Array.isArray(exames) || exames.length === 0) return undefined;
  return {
    create: exames.map((exame) => ({
      ...exame,
      data_exame: exame.data_exame ? new Date(exame.data_exame) : null,
    })),
  };
};

const findById = (id) =>
  prisma.consulta.findUnique({
    where: { id: Number(id) },
    include: consultaInclude,
  });

const findByPacienteId = (paciente_id) =>
  prisma.consulta.findMany({
    where: { paciente_id: Number(paciente_id) },
    include: consultaInclude,
    orderBy: { data_consulta: 'desc' },
  });

const create = ({
  paciente_id,
  nutricionista_id,
  data_consulta,
  objetivo_historia,
  antropometria,
  historia_clinica,
  estilo_vida,
  funcao_intestinal,
  exames,
}) =>
  prisma.consulta.create({
    data: {
      paciente_id: Number(paciente_id),
      nutricionista_id: Number(nutricionista_id),
      data_consulta: new Date(data_consulta),
      objetivo_historia: objetivo_historia ?? null,
      antropometria: buildOneToOneCreate(antropometria),
      historia_clinica: buildOneToOneCreate(historia_clinica),
      estilo_vida: buildOneToOneCreate(estilo_vida),
      funcao_intestinal: buildOneToOneCreate(funcao_intestinal),
      exames: buildExamesCreate(exames),
    },
    include: consultaInclude,
  });

const update = (id, dados) => {
  const data = {};
  if (dados.data_consulta !== undefined) data.data_consulta = new Date(dados.data_consulta);
  if (dados.objetivo_historia !== undefined) data.objetivo_historia = dados.objetivo_historia;
  if (dados.paciente_id !== undefined) data.paciente_id = Number(dados.paciente_id);
  if (dados.nutricionista_id !== undefined) data.nutricionista_id = Number(dados.nutricionista_id);

  return prisma.consulta.update({
    where: { id: Number(id) },
    data,
    include: consultaInclude,
  });
};

const remove = (id) =>
  prisma.$transaction(async (tx) => {
    const consultaId = Number(id);
    await tx.antropometria.deleteMany({ where: { consulta_id: consultaId } });
    await tx.historiaClinica.deleteMany({ where: { consulta_id: consultaId } });
    await tx.estiloVida.deleteMany({ where: { consulta_id: consultaId } });
    await tx.funcaoIntestinalUrinaria.deleteMany({ where: { consulta_id: consultaId } });
    await tx.exameBioquimico.deleteMany({ where: { consulta_id: consultaId } });
    return tx.consulta.delete({ where: { id: consultaId } });
  });

module.exports = { findById, findByPacienteId, create, update, remove };