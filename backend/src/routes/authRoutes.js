const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/ativar-conta', authController.ativarConta);  // paciente ativa conta (etapa 2)
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/social-login', authController.socialLogin);

module.exports = router;
