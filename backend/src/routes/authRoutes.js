const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateAtivarConta, validateLogin, validateSocialLogin } = require('../middlewares/validation');

router.post('/ativar-conta', validateAtivarConta, authController.ativarConta);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.post('/social-login', validateSocialLogin, authController.socialLogin);

module.exports = router;
