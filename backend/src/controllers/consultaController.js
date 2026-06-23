const consultaService = require('../services/consultaService');

const criar = async (req, res) => {
  try {
    // Garante que o nutricionista_id vem do token JWT, não do body
    const dados = {
      ...req.body,
      nutricionista_id: req.user.id,
    };
    const consulta = await consultaService.criar(dados);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const consulta = await consultaService.buscarPorId(req.params.id);
    res.status(200).json(consulta);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const listarPorPaciente = async (req, res) => {
  try {
    const consultas = await consultaService.listarPorPaciente(req.params.paciente_id);
    res.status(200).json(consultas);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { criar, buscarPorId, listarPorPaciente };
