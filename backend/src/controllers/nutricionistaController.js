const nutricionistaService = require('../services/nutricionistaService');
const { traduzErro } = require('../utils/erros');

const create = async (req, res) => {
  try {
    const nutricionista = await nutricionistaService.create(req.body);
    res.status(201).json(nutricionista);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

const findAll = async (req, res) => {
  try {
    const nutricionistas = await nutricionistaService.findAll();
    res.status(200).json(nutricionistas);
  } catch (err) {
    res.status(500).json({ error: traduzErro(err) });
  }
};

const remove = async (req, res) => {
  try {
    await nutricionistaService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
};

module.exports = { create, findAll, remove };
