const express = require('express');
const router = express.Router();
const nutricionistaController = require('../controllers/nutricionistaController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

router.get('/', auth, nutricionistaController.findAll);
router.get('/:id', auth, nutricionistaController.getById);
router.post('/', auth, authorize('admin'), nutricionistaController.create);
router.put('/:id', auth, authorize('nutricionista', 'admin'), nutricionistaController.update);
router.delete('/:id', auth, authorize('admin'), nutricionistaController.remove);

module.exports = router;