const planoService = require('../services/planoAlimentarService');
const { traduzErro } = require('../utils/erros');

// Nutricionista/admin acessam qualquer plano; paciente só o próprio.
const podeVerPlano = (req, plano) => {
  const { tipo, role, id } = req.user;
  if (tipo === 'nutricionista' || role === 'nutricionista' || role === 'admin') return true;
  return Number(plano.paciente_id) === Number(id);
};

const getById = async (req, res) => {
  try {
    const plano = await planoService.getById(req.params.id);
    if (!podeVerPlano(req, plano)) {
      return res.status(403).json({ error: 'Acesso não autorizado a este plano!' });
    }
    res.status(200).json(plano);
  } catch (err) {
    res.status(404).json({ error: traduzErro(err) });
  }
};

const create = async (req, res) => {
  try {
    // O nutricionista dono vem do token JWT, não do body (evita atribuir a outro).
    const plano = await planoService.create({ ...req.body, nutricionista_id: req.user.id });
    res.status(201).json(plano);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

const update = async (req, res) => {
  try {
    const plano = await planoService.update(req.params.id, req.body);
    res.status(200).json(plano);
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

const remove = async (req, res) => {
  try {
    await planoService.remove(req.params.id);
    res.status(200).json({ message: 'Plano removido com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: traduzErro(err) });
  }
};

module.exports = { getById, create, update, remove };