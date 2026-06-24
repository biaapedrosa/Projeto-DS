const alimentoTacoRepository = require('../repositories/alimentoTacoRepository');

const findAll = () => alimentoTacoRepository.findAll();

const getById = async (id) => {
  const alimento = await alimentoTacoRepository.findById(id);
  if (!alimento) throw new Error('Alimento não encontrado!');
  return alimento;
};

const search = async (termo) => {
  if (!termo || termo.trim().length < 2) {
    throw new Error('O termo de busca deve ter pelo menos 2 caracteres.');
  }
  return alimentoTacoRepository.search(termo.trim());
};

module.exports = { findAll, getById, search };
