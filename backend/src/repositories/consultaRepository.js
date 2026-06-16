const prisma = require('../db');

const create = (data) =>
  prisma.consulta.create({ data });

const findById = (id) =>
  prisma.consulta.findUnique({
    where: { id: Number(id) },
    include: {
      antropometria: true,
      historia_clinica: true,
      estilo_vida: { include: { complemento: true } },
      funcao_intestinal: true,
      exames: true,
      dados_gestante: true,
      paciente: { select: { id: true, nome: true, tipo_paciente: true, data_nascimento: true } },
      nutricionista: { select: { id: true, nome: true } },
    },
  });

const findByPacienteId = (paciente_id) =>
  prisma.consulta.findMany({
    where: { paciente_id: Number(paciente_id) },
    orderBy: { data_consulta: 'desc' },
    include: {
      antropometria: true,
      historia_clinica: true,
      estilo_vida: { include: { complemento: true } },
      funcao_intestinal: true,
      exames: true,
      dados_gestante: true,
    },
  });

// Antropometria
const createAntropometria = (data) =>
  prisma.antropometria.create({ data });

const updateAntropometria = (consulta_id, data) =>
  prisma.antropometria.update({ where: { consulta_id: Number(consulta_id) }, data });

// História Clínica
const createHistoriaClinica = (data) =>
  prisma.historiaClinica.create({ data });

const updateHistoriaClinica = (consulta_id, data) =>
  prisma.historiaClinica.update({ where: { consulta_id: Number(consulta_id) }, data });

// Estilo de Vida
const createEstiloVida = (data) =>
  prisma.estiloVida.create({ data });

const updateEstiloVida = (consulta_id, data) =>
  prisma.estiloVida.update({ where: { consulta_id: Number(consulta_id) }, data });

// Estilo de Vida Complemento
const createEstiloVidaComplemento = (data) =>
  prisma.estiloVidaComplemento.create({ data });

const updateEstiloVidaComplemento = (estilo_vida_id, data) =>
  prisma.estiloVidaComplemento.update({ where: { estilo_vida_id: Number(estilo_vida_id) }, data });

// Função Intestinal
const createFuncaoIntestinal = (data) =>
  prisma.funcaoIntestinalUrinaria.create({ data });

const updateFuncaoIntestinal = (consulta_id, data) =>
  prisma.funcaoIntestinalUrinaria.update({ where: { consulta_id: Number(consulta_id) }, data });

// Exames Bioquímicos
const createExames = (exames) =>
  prisma.exameBioquimico.createMany({ data: exames });

// Dados Gestante
const createDadosGestante = (data) =>
  prisma.dadosGestante.create({ data });

const updateDadosGestante = (consulta_id, data) =>
  prisma.dadosGestante.update({ where: { consulta_id: Number(consulta_id) }, data });

module.exports = {
  create,
  findById,
  findByPacienteId,
  createAntropometria,
  updateAntropometria,
  createHistoriaClinica,
  updateHistoriaClinica,
  createEstiloVida,
  updateEstiloVida,
  createEstiloVidaComplemento,
  updateEstiloVidaComplemento,
  createFuncaoIntestinal,
  updateFuncaoIntestinal,
  createExames,
  createDadosGestante,
  updateDadosGestante,
};
