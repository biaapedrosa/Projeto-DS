const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

// Nutricionista/admin pré-cadastra o paciente (etapa 1 do fluxo de cadastro)
router.post('/precadastro', auth, authorize('nutricionista', 'admin'), pacienteController.preCadastrar);

// Listagem e gestão (restrito a nutricionista/admin)
router.post('/', auth, authorize('nutricionista', 'admin'), pacienteController.criar);
router.get('/', auth, authorize('nutricionista', 'admin'), pacienteController.getAll);
router.delete('/:id', auth, authorize('nutricionista', 'admin'), pacienteController.remove);

// Leitura e atualização — acessível ao próprio paciente ou nutricionista
router.get('/:id', auth, pacienteController.getById);
router.put('/:id', auth, pacienteController.update);
router.get('/:id/planos', auth, pacienteController.getPlanos);

module.exports = router;
