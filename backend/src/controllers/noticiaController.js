const noticiaRepo = require('../repositories/noticiaRepository');

const list = async (req, res) => {
  try {
    const noticias = await noticiaRepo.findAll();
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const noticia = await noticiaRepo.findById(req.params.id);
    if (!noticia) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    if (req.user.role !== 'nutricionista') return res.status(403).json({ error: 'Acesso negado' });
    const noticia = await noticiaRepo.create(req.body);
    res.status(201).json(noticia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    if (req.user.role !== 'nutricionista') return res.status(403).json({ error: 'Acesso negado' });
    const noticia = await noticiaRepo.update(req.params.id, req.body);
    if (!noticia) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { list, getById, create, update };
