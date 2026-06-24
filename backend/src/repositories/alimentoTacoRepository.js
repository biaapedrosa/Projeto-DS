const prisma = require('../db');

const findAll = () =>
  prisma.alimentoTaco.findMany({ orderBy: { descricao: 'asc' } });

const findById = (id) =>
  prisma.alimentoTaco.findUnique({ where: { id: Number(id) } });

const search = (termo) =>
  prisma.alimentoTaco.findMany({
    where: {
      descricao: { contains: termo, mode: 'insensitive' },
    },
    orderBy: { descricao: 'asc' },
  });

module.exports = { findAll, findById, search };
