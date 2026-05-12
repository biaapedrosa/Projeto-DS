// Importa o Express e cria o roteador para as notícias
const express = require('express');
const router = express.Router();

// Importa o controller com as funções de CRUD de notícias
const noticiaController = require('../controllers/noticiaController');

// Importa o middleware de autenticação para proteger as rotas de escrita
const auth = require('../middlewares/auth');

// GET /api/noticias — lista todas as notícias (rota PÚBLICA — sem autenticação)
// Qualquer usuário, logado ou não, pode ver as notícias
router.get('/', noticiaController.getAll);

// GET /api/noticias/:id — busca uma notícia pelo ID (também pública)
router.get('/:id', noticiaController.getById);

// POST /api/noticias — cria uma nova notícia (requer autenticação)
// Só quem está logado (nutricionista) pode publicar notícias
router.post('/', auth, noticiaController.create);

// PUT /api/noticias/:id — atualiza uma notícia existente (requer autenticação)
router.put('/:id', auth, noticiaController.update);

// DELETE /api/noticias/:id — remove uma notícia (requer autenticação)
router.delete('/:id', auth, noticiaController.remove);

// Exporta o roteador para ser registrado no app.js com o prefixo /api/noticias
module.exports = router;
