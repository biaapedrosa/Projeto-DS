const nutricionistaService = require('../services/nutricionistaService');

const create = async (req, res) => {
  try {
    const nutricionista = await nutricionistaService.create(req.body);
    res.status(201).json(nutricionista);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const nutricionistas = await nutricionistaService.findAll();
    res.status(200).json(nutricionistas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await nutricionistaService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { create, findAll, remove };
