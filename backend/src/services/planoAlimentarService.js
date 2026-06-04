const planoRepository = require('../repositories/planoRepository');

const getById = async (id) => {
  const plano = await planoRepository.findById(id);
  if (!plano) throw new Error('Plano não encontrado!');
  return plano;
};

const create = async (dados) => {
  const { paciente_id, nutricionista_id, data } = dados;
  if (!paciente_id || !nutricionista_id || !data) {
    throw new Error('paciente_id, nutricionista_id e data são obrigatórios!');
  }
  return await planoRepository.create(dados);
};

const update = async (id, dados) => {
  const plano = await planoRepository.findById(id);
  if (!plano) throw new Error('Plano não encontrado!');
  return planoRepository.update(id, dados);
};

const remove = async (id) => {
  const plano = await planoRepository.findById(id);
  if (!plano) throw new Error('Plano não encontrado!');
  await planoRepository.remove(id);
};

module.exports = { getById, create, update, remove };