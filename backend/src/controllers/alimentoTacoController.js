const alimentoTacoService = require('../services/alimentoTacoService');

const findAll = async (req, res) => {
  try {
    const { busca } = req.query;
    const alimentos = busca
      ? await alimentoTacoService.search(busca)
      : await alimentoTacoService.findAll();
    res.status(200).json(alimentos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const alimento = await alimentoTacoService.getById(req.params.id);
    res.status(200).json(alimento);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { findAll, getById };
