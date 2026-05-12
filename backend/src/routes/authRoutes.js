// Importa o Express e cria um roteador isolado para as rotas de autenticação
// Usar Router() é uma boa prática — separa as rotas por domínio (auth, pacientes, etc.)
const express = require('express');
const router = express.Router();

// Importa as funções do controller de autenticação
const authController = require('../controllers/authController');

// POST /api/auth/register — cadastra um novo paciente
// Não precisa de middleware de auth porque é uma rota pública (qualquer um pode se registrar)
router.post('/register', authController.register);

// POST /api/auth/login — autentica um paciente e retorna um token JWT
router.post('/login', authController.login);

// POST /api/auth/logout — encerra a sessão do paciente
// Como usamos JWT, o logout é tratado no lado do cliente (apagando o token do localStorage)
router.post('/logout', authController.logout);

// Exporta o roteador para ser registrado no app.js com o prefixo /api/auth
module.exports = router;
