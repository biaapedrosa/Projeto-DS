const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

router.get('/paciente/:pacienteId', auth, consultaController.getByPaciente);
router.get('/:id', auth, consultaController.getById);
router.post('/', auth, authorize('nutricionista', 'admin'), consultaController.create);
router.put('/:id', auth, authorize('nutricionista', 'admin'), consultaController.update);
router.delete('/:id', auth, authorize('nutricionista', 'admin'), consultaController.remove);

module.exports = router;