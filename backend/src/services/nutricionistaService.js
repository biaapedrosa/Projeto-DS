const bcrypt = require('bcryptjs');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');

const create = async ({ nome, cpf, email, telefone, crn, senha, role }) => {
  if (!nome || !cpf || !email || !telefone || !senha) {
    throw new Error('Nome, CPF, e-mail, telefone e senha são obrigatórios.');
  }

  const cpfLimpo = String(cpf).replace(/\D/g, '');
  if (cpfLimpo.length !== 11) throw new Error('CPF deve conter 11 dígitos.');

  const existente = await nutricionistaRepository.findByEmail(email);
  if (existente) throw new Error('Email já cadastrado!');

  const senhaHash = await bcrypt.hash(senha, 10);
  return nutricionistaRepository.create({ nome, cpf: cpfLimpo, email, telefone, crn, senha: senhaHash, role });
};

const findAll = () => nutricionistaRepository.findAll();

const getById = async (id) => {
  const nutricionista = await nutricionistaRepository.findById(id);
  if (!nutricionista) throw new Error('Nutricionista não encontrado!');
  return nutricionista;
};

const update = async (id, dados) => {
  const nutricionista = await nutricionistaRepository.findById(id);
  if (!nutricionista) throw new Error('Nutricionista não encontrado!');

  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  return nutricionistaRepository.update(id, dados);
};

const remove = async (id) => {
  const nutricionista = await nutricionistaRepository.findById(id);
  if (!nutricionista) throw new Error('Nutricionista não encontrado!');
  return nutricionistaRepository.remove(id);
};

module.exports = { create, findAll, getById, update, remove };
