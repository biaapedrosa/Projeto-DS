const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const auth = require('../middlewares/auth');

router.get('/:id', auth, pacienteController.getById);
router.put('/:id', auth, pacienteController.update);
router.get('/:id/planos', auth, pacienteController.getPlanos);

module.exports = router;
