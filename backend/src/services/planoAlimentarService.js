const planoRepository = require('../repositories/planoRepository');

const getById = async (id) => {
  const plano = await planoRepository.findById(id);
  if (!plano) throw new Error('Plano não encontrado!');
  return plano;
};

const create = async (dados) => {
  return await planoRepository.create(dados);
};

const update = async (id, dados) => {
  const plano = await planoRepository.update(id, dados);
  if (!plano) throw new Error('Plano não encontrado!');
  return plano;
};

const remove = async (id) => {
  await planoRepository.remove(id);
};

module.exports = { getById, create, update, remove };