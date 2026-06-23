const prisma = require('../db');

// Campos seguros para exposição (sem hash de senha). Usado nas leituras que
// chegam ao front; findByEmail/findByCpf mantêm tudo pois a autenticação
// precisa do hash de senha e do flag conta_ativada.
const safeSelect = {
  id: true, nome: true, cpf: true, email: true, cartao_sus: true,
  conta_ativada: true, tipo_paciente: true, sexo: true, data_nascimento: true,
  idade: true, telefone_whatsapp: true, ocupacao: true, vinculo_ufpe: true,
  objetivo: true, created_at: true,
};

const findByEmail = (email) =>
  prisma.paciente.findUnique({ where: { email } });

const findByCpf = (cpf) =>
  prisma.paciente.findUnique({ where: { cpf } });

const findById = (id) =>
  prisma.paciente.findUnique({ where: { id: Number(id) }, select: safeSelect });

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

// Cadastro completo feito por admin/nutricionista: já cria a conta ativada
// (com senha definida), diferente do pré-cadastro.
const criar = (dados) =>
  prisma.paciente.create({ data: dados, select: safeSelect });

// Ativação pelo próprio paciente: define email, senha e ativa conta
const ativarConta = (id, { email, senha }) =>
  prisma.paciente.update({
    where: { id: Number(id) },
    data: { email, senha, conta_ativada: true },
  });

const update = (id, dados) =>
  prisma.paciente.update({ where: { id: Number(id) }, data: dados });

const findAll = () =>
  prisma.paciente.findMany({ orderBy: { id: 'asc' }, select: safeSelect });

const remove = (id) =>
  prisma.paciente.delete({ where: { id: Number(id) } });

module.exports = { findByEmail, findByCpf, findById, criar, preCadastrar, ativarConta, update, findAll, remove };

