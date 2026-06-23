const service = require('../services/pacienteDashboardService');
const { traduzErro } = require('../utils/erros');

// GET /api/paciente/home
// Retorna dados do card da home: info do paciente + última consulta
const getHome = async (req, res) => {
  try {
    const paciente_id = req.user.id;
    const dados = await service.getResumoHome(paciente_id);
    res.json(dados);
  } catch (err) {
    const status = err.message?.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ error: traduzErro(err) });
  }
};

// GET /api/paciente/plano-vigente
// Retorna o plano alimentar mais recente do paciente
const getPlanoVigente = async (req, res) => {
  try {
    const paciente_id = req.user.id;
    const plano = await service.getPlanoVigente(paciente_id);
    res.json(plano);
  } catch (err) {
    const status = err.message?.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ error: traduzErro(err) });
  }
};

// GET /api/paciente/historico-planos
// Retorna lista de todos os planos do paciente
const getHistoricoPlanos = async (req, res) => {
  try {
    const paciente_id = req.user.id;
    const planos = await service.getHistoricoPlanos(paciente_id);
    res.json(planos);
  } catch (err) {
    const status = err.message?.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ error: traduzErro(err) });
  }
};

// GET /api/paciente/planos/:planoId
// Retorna um plano completo pelo id (validando que pertence ao paciente logado)
const getPlanoById = async (req, res) => {
  try {
    const paciente_id = req.user.id;
    const plano_id = req.params.planoId;
    const plano = await service.getPlanoById(plano_id, paciente_id);
    res.json(plano);
  } catch (err) {
    const status = err.message?.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ error: traduzErro(err) });
  }
};

module.exports = { getHome, getPlanoVigente, getHistoricoPlanos, getPlanoById };