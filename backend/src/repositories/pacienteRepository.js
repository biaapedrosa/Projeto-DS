const prisma = require('../db');

const findByEmail = (email) =>
  prisma.paciente.findUnique({ where: { email } });

const create = ({ nome, email, senha, sexo, data_nascimento, idade, telefone_whatsapp, ocupacao, vinculo_ufpe, objetivo, tipo_paciente, peso_maximo }) =>
  prisma.paciente.create({
    data: {
      nome, email, senha,
      sexo: sexo || null,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      idade: idade ? Number(idade) : null,
      telefone_whatsapp: telefone_whatsapp || null,
      ocupacao: ocupacao || null,
      vinculo_ufpe: vinculo_ufpe || null,
      objetivo: objetivo || null,
      tipo_paciente: tipo_paciente || null,
      peso_maximo: peso_maximo ? parseFloat(peso_maximo) : null,
    },
  });

const findById = (id) =>
  prisma.paciente.findUnique({ where: { id: Number(id) } });

const update = (id, dados) =>
  prisma.paciente.update({ where: { id: Number(id) }, data: dados });

const findAll = () =>
  prisma.paciente.findMany({ orderBy: { id: 'asc' } });

const remove = (id) =>
  prisma.paciente.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, create, findById, update, findAll, remove };
