const pacienteService = require('../services/pacienteService');

const getById = async (req, res) => {
  try {
    const paciente = await pacienteService.getById(req.params.id);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const paciente = await pacienteService.update(req.params.id, req.body);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPlanos = async (req, res) => {
  try {
    const planos = await pacienteService.getPlanos(req.params.id);
    res.status(200).json(planos);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getById, update, getPlanos };