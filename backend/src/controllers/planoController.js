const planoService = require('../services/planoAlimentarService');

const getById = async (req, res) => {
  try {
    const plano = await planoService.getById(req.params.id);
    res.status(200).json(plano);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const plano = await planoService.create(req.body);
    res.status(201).json(plano);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const plano = await planoService.update(req.params.id, req.body);
    res.status(200).json(plano);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await planoService.remove(req.params.id);
    res.status(200).json({ message: 'Plano removido com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getById, create, update, remove };