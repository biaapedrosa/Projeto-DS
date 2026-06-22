const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { authorize } = require('../middlewares/auth');
const controller = require('../controllers/pacientedashboardcontroller');

// Todas as rotas exigem autenticação como paciente
router.use(auth);
router.use(authorize('paciente'));

// GET /api/paciente/home
router.get('/home', controller.getHome);

// GET /api/paciente/plano-vigente
router.get('/plano-vigente', controller.getPlanoVigente);

// GET /api/paciente/historico-planos
router.get('/historico-planos', controller.getHistoricoPlanos);

// GET /api/paciente/planos/:planoId
router.get('/planos/:planoId', controller.getPlanoById);

module.exports = router;