const prisma = require('../db');

const findByEmail = (email) =>
  prisma.paciente.findUnique({ where: { email } });

const findByCpf = (cpf) =>
  prisma.paciente.findUnique({ where: { cpf } });

const findById = (id) =>
  prisma.paciente.findUnique({ where: { id: Number(id) } });

// Pré-cadastro feito pelo nutricionista (sem senha, conta_ativada = false)
const preCadastrar = ({ nome, cpf, data_nascimento, cartao_sus, email, telefone_whatsapp }) =>
  prisma.paciente.create({
    data: {
      nome,
      cpf,
      cartao_sus: cartao_sus || null,
      email: email || null,
      telefone_whatsapp: telefone_whatsapp || null,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      senha: null,
      conta_ativada: false,
    },
  });

// Ativação pelo próprio paciente: define email, senha e ativa conta
const ativarConta = (id, { email, senha }) =>
  prisma.paciente.update({
    where: { id: Number(id) },
    data: { email, senha, conta_ativada: true },
  });

const update = (id, dados) =>
  prisma.paciente.update({ where: { id: Number(id) }, data: dados });

const findAll = () =>
  prisma.paciente.findMany({ orderBy: { id: 'asc' } });

const remove = (id) =>
  prisma.paciente.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, findByCpf, findById, preCadastrar, ativarConta, update, findAll, remove };

