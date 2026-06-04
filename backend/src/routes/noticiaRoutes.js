const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

router.get('/', noticiaController.getAll);
router.get('/:id', noticiaController.getById);
router.post('/', auth, authorize('nutricionista', 'admin'), noticiaController.create);
router.put('/:id', auth, authorize('nutricionista', 'admin'), noticiaController.update);
router.delete('/:id', auth, authorize('nutricionista', 'admin'), noticiaController.remove);

module.exports = router;