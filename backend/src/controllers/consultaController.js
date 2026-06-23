const consultaService = require('../services/consultaService');

const getById = async (req, res) => {
  try {
    const consulta = await consultaService.getById(req.params.id);
    res.status(200).json(consulta);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getByPaciente = async (req, res) => {
  try {
    const consultas = await consultaService.getByPaciente(req.params.pacienteId);
    res.status(200).json(consultas);
  } catch (err) {
    res.status(404).json({ error: err.message });
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

const update = async (req, res) => {
  try {
    const consulta = await consultaService.update(req.params.id, req.body);
    res.status(200).json(consulta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await consultaService.remove(req.params.id);
    res.status(200).json({ message: 'Ficha médica removida com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getById, getByPaciente, create, update, remove };