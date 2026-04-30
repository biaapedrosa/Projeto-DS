const noticiaRepository = require('../repositories/noticiaRepository');

const getAll = async () => await noticiaRepository.findAll();

const getById = async (id) => {
  const noticia = await noticiaRepository.findById(id);
  if (!noticia) throw new Error('Notícia não encontrada!');
  return noticia;
};

const create = async (dados) => await noticiaRepository.create(dados);

const update = async (id, dados) => {
  const noticia = await noticiaRepository.update(id, dados);
  if (!noticia) throw new Error('Notícia não encontrada!');
  return noticia;
};

module.exports = { getAll, getById, create, update };