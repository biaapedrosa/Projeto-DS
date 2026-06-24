const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

// Apenas nutricionistas autenticados podem criar e visualizar consultas
router.post('/', auth, authorize('nutricionista', 'admin'), consultaController.criar);
router.get('/paciente/:paciente_id', auth, authorize('nutricionista', 'admin'), consultaController.listarPorPaciente);
router.get('/:id', auth, authorize('nutricionista', 'admin'), consultaController.buscarPorId);

module.exports = router;
