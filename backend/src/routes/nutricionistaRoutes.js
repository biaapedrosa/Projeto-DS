const express = require('express');
const router = express.Router();
const nutricionistaController = require('../controllers/nutricionistaController');
const auth = require('../middlewares/auth');

router.get('/', auth, nutricionistaController.findAll);
router.post('/', auth, nutricionistaController.create);
router.delete('/:id', auth, nutricionistaController.remove);

module.exports = router;
