const prisma = require('../db');

const findByEmail = (email) =>
  prisma.nutricionista.findUnique({ where: { email } });

const findById = (id) =>
  prisma.nutricionista.findUnique({ where: { id: Number(id) } });

const create = ({ crn, ...resto }) =>
  prisma.nutricionista.create({ data: { ...resto, crn: crn || null } });

const findAll = () =>
  prisma.nutricionista.findMany({ orderBy: { id: 'asc' } });

const update = (id, dados) =>
  prisma.nutricionista.update({ where: { id: Number(id) }, data: dados });

const remove = (id) =>
  prisma.nutricionista.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, findById, create, findAll, update, remove };
