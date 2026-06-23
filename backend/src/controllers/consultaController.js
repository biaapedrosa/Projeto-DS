const consultaService = require('../services/consultaService');
const { traduzErro } = require('../utils/erros');

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
    res.status(400).json({ error: traduzErro(err) });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const consulta = await consultaService.buscarPorId(req.params.id);
    res.status(200).json(consulta);
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
};

const listarPorPaciente = async (req, res) => {
  try {
    const consultas = await consultaService.listarPorPaciente(req.params.paciente_id);
    res.status(200).json(consultas);
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
};

module.exports = { criar, buscarPorId, listarPorPaciente };
