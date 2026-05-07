const pacienteRepo = require('../repositories/pacienteRepository');
const planoRepo = require('../repositories/planoRepository');

const getById = async (req, res) => {
  try {
    const paciente = await pacienteRepo.findById(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const paciente = await pacienteRepo.update(req.params.id, req.body);
    if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPlanos = async (req, res) => {
  try {
    const planos = await planoRepo.findByPacienteId(req.params.id);
    res.json(planos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getById, update, getPlanos };
