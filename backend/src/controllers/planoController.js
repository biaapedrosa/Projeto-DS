const planoService = require('../services/planoAlimentarService');

const getById = async (req, res) => {
  try {
    const plano = await planoService.getById(req.params.id);
    if (!plano) return res.status(404).json({ error: 'Plano não encontrado' });
    res.json(plano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    if (req.user.role !== 'nutricionista') return res.status(403).json({ error: 'Acesso negado' });
    const plano = await planoService.create({ ...req.body, nutricionista_id: req.user.id });
    res.status(201).json(plano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    if (req.user.role !== 'nutricionista') return res.status(403).json({ error: 'Acesso negado' });
    const plano = await planoService.update(req.params.id, req.body);
    if (!plano) return res.status(404).json({ error: 'Plano não encontrado' });
    res.json(plano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    if (req.user.role !== 'nutricionista') return res.status(403).json({ error: 'Acesso negado' });
    await planoService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getById, create, update, remove };
