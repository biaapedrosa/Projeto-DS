const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');
const controller = require('../controllers/consultaController');

// Todas as rotas exigem autenticação de nutricionista
router.use(auth);
router.use(authorize('nutricionista', 'admin'));

router.get('/paciente/:pacienteId', controller.getByPaciente);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id/anamnese', controller.saveAnamnese);

module.exports = router;