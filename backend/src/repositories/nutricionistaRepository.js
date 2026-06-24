const prisma = require('../db');

// Campos seguros para exposição (sem hash de senha).
const safeSelect = {
  id: true, nome: true, email: true, telefone: true,
  crn: true, role: true, created_at: true,
};

const findByEmail = (email) =>
  prisma.nutricionista.findUnique({ where: { email } });

const findById = (id) =>
  prisma.nutricionista.findUnique({ where: { id: Number(id) } });

const create = ({ crn, role, ...resto }) =>
  prisma.nutricionista.create({
    data: { ...resto, crn: crn || null, role: role || 'nutricionista' },
    select: safeSelect,
  });

const findAll = () =>
  prisma.nutricionista.findMany({ orderBy: { id: 'asc' }, select: safeSelect });

const update = (id, dados) =>
  prisma.nutricionista.update({
    where: { id: Number(id) },
    data: dados,
    select: safeSelect,
  });

const remove = (id) =>
  prisma.nutricionista.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, findById, create, findAll, update, remove };
