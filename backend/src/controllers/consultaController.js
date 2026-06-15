const consultaService = require('../services/consultaService');

const getByPaciente = async (req, res) => {
  try {
    const consultas = await consultaService.getByPaciente(req.params.pacienteId);
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const consulta = await consultaService.getById(req.params.id);
    if (!consulta) return res.status(404).json({ error: 'Consulta não encontrada.' });
    res.json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const consulta = await consultaService.create(req.body);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const saveAnamnese = async (req, res) => {
  try {
    const consulta = await consultaService.saveAnamnese(req.params.id, req.body);
    res.json(consulta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getByPaciente, getById, create, saveAnamnese };