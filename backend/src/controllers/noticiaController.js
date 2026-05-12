// Importa o service de notícias, que contém a lógica de negócio
const noticiaService = require('../services/noticiaService');

// Retorna todas as notícias cadastradas (ex: GET /api/noticias)
// Essa rota é pública — não exige autenticação
const getAll = async (req, res) => {
  try {
    const noticias = await noticiaService.getAll();
    res.status(200).json(noticias);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Busca uma notícia específica pelo ID (ex: GET /api/noticias/3)
const getById = async (req, res) => {
  try {
    const noticia = await noticiaService.getById(req.params.id);
    res.status(200).json(noticia);
  } catch (err) {
    // Se não encontrar, retorna 404
    res.status(404).json({ error: err.message });
  }
};

// Cria uma nova notícia (ex: POST /api/noticias)
// Requer autenticação (definida na rota) — só o nutricionista pode publicar
const create = async (req, res) => {
  try {
    const noticia = await noticiaService.create(req.body);
    // 201 = Created
    res.status(201).json(noticia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualiza uma notícia existente (ex: PUT /api/noticias/3)
const update = async (req, res) => {
  try {
    const noticia = await noticiaService.update(req.params.id, req.body);
    res.status(200).json(noticia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove uma notícia pelo ID (ex: DELETE /api/noticias/3)
const remove = async (req, res) => {
  try {
    await noticiaService.remove(req.params.id);
    // 204 = No Content — deleção bem-sucedida sem corpo de resposta
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Exporta todas as funções para serem usadas nas rotas de notícias
module.exports = { getAll, getById, create, update, remove };
