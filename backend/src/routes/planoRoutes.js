const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

router.get('/:id', auth, planoController.getById);
router.post('/', auth, authorize('nutricionista', 'admin'), planoController.create);
router.put('/:id', auth, authorize('nutricionista', 'admin'), planoController.update);
router.delete('/:id', auth, authorize('nutricionista', 'admin'), planoController.remove);

module.exports = router;