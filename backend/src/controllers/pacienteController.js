// Importa o service de paciente, que contém as regras de negócio
// (verificação de existência, validações, etc.)
const pacienteService = require('../services/pacienteService');

// Busca um paciente pelo ID passado na URL (ex: GET /api/pacientes/1)
const getById = async (req, res) => {
  try {
    // req.params.id vem da URL — o Express extrai automaticamente
    const paciente = await pacienteService.getById(req.params.id);
    res.status(200).json(paciente);
  } catch (err) {
    // Se o paciente não existir, o service lança erro e retornamos 404 (Not Found)
    res.status(404).json({ error: err.message });
  }
};

// Atualiza os dados de um paciente existente (ex: PUT /api/pacientes/1)
const update = async (req, res) => {
  try {
    // req.params.id identifica qual paciente atualizar
    // req.body contém os novos dados enviados no corpo da requisição
    const paciente = await pacienteService.update(req.params.id, req.body);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Retorna todos os planos alimentares de um paciente específico
// (ex: GET /api/pacientes/1/planos)
const getPlanos = async (req, res) => {
  try {
    const planos = await pacienteService.getPlanos(req.params.id);
    res.status(200).json(planos);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Retorna a lista completa de todos os pacientes cadastrados
// (ex: GET /api/pacientes)
const getAll = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAll();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove um paciente pelo ID (ex: DELETE /api/pacientes/1)
const remove = async (req, res) => {
  try {
    await pacienteService.remove(req.params.id);
    // Status 204 significa "No Content" — operação bem-sucedida sem corpo de resposta
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Exporta todas as funções para serem associadas às rotas no arquivo de rotas
module.exports = { getById, update, getPlanos, getAll, remove };
