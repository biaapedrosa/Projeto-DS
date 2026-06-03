const prisma = require('../db');

const findById = (id) =>
  prisma.planoAlimentar.findUnique({ where: { id: Number(id) } });

const findByPacienteId = (paciente_id) =>
  prisma.planoAlimentar.findMany({ where: { paciente_id: Number(paciente_id) } });

const create = ({ paciente_id, nutricionista_id, descricao, status }) =>
  prisma.planoAlimentar.create({
    data: { paciente_id: Number(paciente_id), nutricionista_id: Number(nutricionista_id), descricao, status },
  });

const update = (id, dados) =>
  prisma.planoAlimentar.update({ where: { id: Number(id) }, data: dados });

const remove = (id) =>
  prisma.planoAlimentar.delete({ where: { id: Number(id) } });

module.exports = { findById, findByPacienteId, create, update, remove };
