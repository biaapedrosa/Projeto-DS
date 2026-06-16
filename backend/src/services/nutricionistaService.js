const bcrypt = require('bcryptjs');
const nutricionistaRepository = require('../repositories/nutricionistaRepository');

const create = async ({ nome, cpf, email, telefone, crn, senha }) => {
  const existente = await nutricionistaRepository.findByEmail(email);
  if (existente) throw new Error('Email já cadastrado!');

  const senhaHash = await bcrypt.hash(senha, 10);
  return nutricionistaRepository.create({ nome, cpf, email, telefone, crn, senha: senhaHash });
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
  return nutricionistaRepository.update(id, dados);
};

const remove = async (id) => {
  const nutricionista = await nutricionistaRepository.findById(id);
  if (!nutricionista) throw new Error('Nutricionista não encontrado!');
  return nutricionistaRepository.remove(id);
};

module.exports = { create, findAll, getById, update, remove };
