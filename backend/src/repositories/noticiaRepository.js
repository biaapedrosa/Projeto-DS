const prisma = require('../db');

const findAll = () =>
  prisma.noticia.findMany({ orderBy: { data_publicacao: 'desc' } });

const findById = (id) =>
  prisma.noticia.findUnique({ where: { id: Number(id) } });

const create = ({ titulo, conteudo }) =>
  prisma.noticia.create({ data: { titulo, conteudo } });

const update = (id, dados) =>
  prisma.noticia.update({ where: { id: Number(id) }, data: dados });

const remove = (id) =>
  prisma.noticia.delete({ where: { id: Number(id) } });

module.exports = { findAll, findById, create, update, remove };
