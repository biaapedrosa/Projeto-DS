// Importa o Express e cria o roteador para os planos alimentares
const express = require('express');
const router = express.Router();

// Importa o controller que lida com a lógica de resposta das requisições de plano
const planoController = require('../controllers/planoController');

// Importa o middleware de autenticação — todas as rotas de plano exigem login
const auth = require('../middlewares/auth');

// GET /api/planos/:id — busca um plano específico pelo ID
router.get('/:id', auth, planoController.getById);

// POST /api/planos — cria um novo plano alimentar
// O corpo da requisição deve conter: paciente_id, nutricionista_id, descricao, status
router.post('/', auth, planoController.create);

// PUT /api/planos/:id — atualiza os dados de um plano existente
router.put('/:id', auth, planoController.update);

// DELETE /api/planos/:id — remove um plano alimentar
router.delete('/:id', auth, planoController.remove);

// Exporta o roteador para ser registrado no app.js com o prefixo /api/planos
module.exports = router;
