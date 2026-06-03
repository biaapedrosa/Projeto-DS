const prisma = require('../db');

const findByEmail = (email) =>
  prisma.paciente.findUnique({ where: { email } });

const create = ({ nome, email, senha, sexo, data_nascimento, idade, telefone_whatsapp, ocupacao, vinculo_ufpe, objetivo }) =>
  prisma.paciente.create({ data: { nome, email, senha, sexo, data_nascimento, idade, telefone_whatsapp, ocupacao, vinculo_ufpe, objetivo } });

const findById = (id) =>
  prisma.paciente.findUnique({ where: { id: Number(id) } });

const update = (id, dados) =>
  prisma.paciente.update({ where: { id: Number(id) }, data: dados });

const findAll = () =>
  prisma.paciente.findMany({ orderBy: { id: 'asc' } });

const remove = (id) =>
  prisma.paciente.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, create, findById, update, findAll, remove };
