// Refactoring Etapa 2: Primitive Obsession corrigido
// throw new Error(string) → throw new NotFoundError(string)
const noticiaRepository = require('../repositories/noticiaRepository');
const { NotFoundError } = require('../errors/AppError');

const getAll = async () => noticiaRepository.findAll();

const getById = async (id) => {
  const noticia = await noticiaRepository.findById(id);
  if (!noticia) throw new NotFoundError('Notícia não encontrada!');
  return noticia;
};

const create = async (dados) => noticiaRepository.create(dados);

const update = async (id, dados) => {
  const noticia = await noticiaRepository.update(id, dados);
  if (!noticia) throw new NotFoundError('Notícia não encontrada!');
  return noticia;
};

const remove = async (id) => {
  const noticia = await noticiaRepository.findById(id);
  if (!noticia) throw new NotFoundError('Notícia não encontrada!');
  await noticiaRepository.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
