// Refactoring Etapas 1, 2 e 3 aplicadas ao projeto real:
// - Extract Constant (httpStatus)
// - asyncHandler (elimina try/catch duplicado)
// - NotFoundError propagado pelo service (statusCode correto automático)
const noticiaService = require('../services/noticiaService');
const asyncHandler = require('../middlewares/asyncHandler');
const HTTP = require('../constants/httpStatus');

const getAll = asyncHandler(async (req, res) => {
  const noticias = await noticiaService.getAll();
  res.status(HTTP.OK).json(noticias);
});

const getById = asyncHandler(async (req, res) => {
  const noticia = await noticiaService.getById(req.params.id);
  res.status(HTTP.OK).json(noticia);
});

const create = asyncHandler(async (req, res) => {
  const noticia = await noticiaService.create(req.body);
  res.status(HTTP.CREATED).json(noticia);
});

const update = asyncHandler(async (req, res) => {
  const noticia = await noticiaService.update(req.params.id, req.body);
  res.status(HTTP.OK).json(noticia);
});

const remove = asyncHandler(async (req, res) => {
  await noticiaService.remove(req.params.id);
  res.status(HTTP.NO_CONTENT).send();
});

module.exports = { getAll, getById, create, update, remove };
