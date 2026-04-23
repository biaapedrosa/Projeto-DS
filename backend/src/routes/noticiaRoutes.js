const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const auth = require('../middlewares/auth');

router.get('/', noticiaController.list);
router.get('/:id', noticiaController.getById);
router.post('/', auth, noticiaController.create);
router.put('/:id', auth, noticiaController.update);

module.exports = router;
