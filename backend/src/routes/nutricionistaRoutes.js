const express = require('express');
const router = express.Router();
const nutricionistaController = require('../controllers/nutricionistaController');
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');

router.get('/', auth, authorize('nutricionista', 'admin'), nutricionistaController.findAll);
router.post('/', auth, authorize('admin'), nutricionistaController.create);
router.delete('/:id', auth, authorize('admin'), nutricionistaController.remove);

module.exports = router;