// Importa o Express para criar o roteador de pacientes
const express = require('express');
const router = express.Router();

// Importa o controller com as funções que tratam cada requisição
const pacienteController = require('../controllers/pacienteController');

// Importa o middleware de autenticação — todas as rotas de paciente são protegidas
// O middleware "auth" verifica o token JWT antes de deixar chegar no controller
const auth = require('../middlewares/auth');

// GET /api/pacientes — lista todos os pacientes (só quem está logado pode ver)
router.get('/', auth, pacienteController.getAll);

// GET /api/pacientes/:id — busca um paciente específico pelo ID
router.get('/:id', auth, pacienteController.getById);

// PUT /api/pacientes/:id — atualiza os dados de um paciente
router.put('/:id', auth, pacienteController.update);

// DELETE /api/pacientes/:id — remove um paciente do sistema
router.delete('/:id', auth, pacienteController.remove);

// GET /api/pacientes/:id/planos — retorna os planos alimentares de um paciente
router.get('/:id/planos', auth, pacienteController.getPlanos);

// Exporta o roteador para ser registrado no app.js com o prefixo /api/pacientes
module.exports = router;
