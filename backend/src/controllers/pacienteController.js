// Refactoring Etapas 1, 2 e 3 aplicadas ao projeto real:
// - Extract Constant (httpStatus)
// - asyncHandler (elimina try/catch duplicado)
// - NotFoundError propagado pelo service (statusCode correto automático)
const pacienteService = require('../services/pacienteService');
const asyncHandler = require('../middlewares/asyncHandler');
const HTTP = require('../constants/httpStatus');

const getAll = asyncHandler(async (req, res) => {
  const pacientes = await pacienteService.getAll();
  res.status(HTTP.OK).json(pacientes);
});

const getById = asyncHandler(async (req, res) => {
  const paciente = await pacienteService.getById(req.params.id);
  res.status(HTTP.OK).json(paciente);
});

const update = asyncHandler(async (req, res) => {
  const paciente = await pacienteService.update(req.params.id, req.body);
  res.status(HTTP.OK).json(paciente);
});

const getPlanos = asyncHandler(async (req, res) => {
  const planos = await pacienteService.getPlanos(req.params.id);
  res.status(HTTP.OK).json(planos);
});

const remove = asyncHandler(async (req, res) => {
  await pacienteService.remove(req.params.id);
  res.status(HTTP.NO_CONTENT).send();
});

module.exports = { getAll, getById, update, getPlanos, remove };
