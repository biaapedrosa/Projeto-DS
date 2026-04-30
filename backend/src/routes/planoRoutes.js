const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const auth = require('../middlewares/auth');

router.get('/:id', auth, planoController.getById);
router.post('/', auth, planoController.create);
router.put('/:id', auth, planoController.update);
router.delete('/:id', auth, planoController.remove);

module.exports = router;