const pacienteService = require('../services/pacienteService');

// Garante que um paciente só acesse a própria ficha.
// Nutricionista e admin podem acessar qualquer paciente.
const podeAcessar = (req) => {
  const { tipo, role, id } = req.user;
  if (tipo === 'nutricionista' || role === 'nutricionista' || role === 'admin') return true;
  return Number(id) === Number(req.params.id);
};

// POST /api/pacientes/precadastro — nutricionista cadastra dados básicos do paciente
const preCadastrar = async (req, res) => {
  try {
    const paciente = await pacienteService.preCadastrar(req.body);
    res.status(201).json({ message: 'Paciente pré-cadastrado com sucesso!', paciente });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    if (!podeAcessar(req)) return res.status(403).json({ error: 'Acesso não autorizado a este paciente!' });
    const paciente = await pacienteService.getById(req.params.id);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    if (!podeAcessar(req)) return res.status(403).json({ error: 'Acesso não autorizado a este paciente!' });
    const paciente = await pacienteService.update(req.params.id, req.body);
    res.status(200).json(paciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPlanos = async (req, res) => {
  try {
    if (!podeAcessar(req)) return res.status(403).json({ error: 'Acesso não autorizado a este paciente!' });
    const planos = await pacienteService.getPlanos(req.params.id);
    res.status(200).json(planos);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAll();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pacienteService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { preCadastrar, getById, update, getPlanos, getAll, remove };