const express = require('express');
const router = express.Router();
const alimentoTacoController = require('../controllers/alimentoTacoController');
const auth = require('../middlewares/auth');

router.get('/', auth, alimentoTacoController.findAll);
router.get('/:id', auth, alimentoTacoController.getById);

module.exports = router;
