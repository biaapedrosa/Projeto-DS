const noticiaService = require('../services/noticiaService');
const { traduzErro } = require('../utils/erros');

const getAll = async (req, res) => {
  try {
    const noticias = await noticiaService.getAll();
    res.status(200).json(noticias);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

const getById = async (req, res) => {
  try {
    const noticia = await noticiaService.getById(req.params.id);
    res.status(200).json(noticia);
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
};

const create = async (req, res) => {
  try {
    const noticia = await noticiaService.create(req.body);
    res.status(201).json(noticia);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

const update = async (req, res) => {
  try {
    const noticia = await noticiaService.update(req.params.id, req.body);
    res.status(200).json(noticia);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};
const remove = async (req, res) => {
  try {
    await noticiaService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
}

module.exports = { getAll, getById, create, update, remove };