// Importa o service de plano alimentar, que encapsula a lógica de negócio
const planoService = require('../services/planoAlimentarService');

// Busca um plano alimentar pelo seu ID (ex: GET /api/planos/1)
const getById = async (req, res) => {
  try {
    const plano = await planoService.getById(req.params.id);
    res.status(200).json(plano);
  } catch (err) {
    // 404 indica que o recurso não foi encontrado
    res.status(404).json({ error: err.message });
  }
};

// Cria um novo plano alimentar (ex: POST /api/planos)
// Os dados do plano (paciente_id, nutricionista_id, descricao, status) vêm no req.body
const create = async (req, res) => {
  try {
    const plano = await planoService.create(req.body);
    // 201 significa que o recurso foi criado com sucesso
    res.status(201).json(plano);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualiza um plano existente (ex: PUT /api/planos/1)
const update = async (req, res) => {
  try {
    const plano = await planoService.update(req.params.id, req.body);
    res.status(200).json(plano);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove um plano alimentar pelo ID (ex: DELETE /api/planos/1)
const remove = async (req, res) => {
  try {
    await planoService.remove(req.params.id);
    res.status(200).json({ message: 'Plano removido com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Exporta as funções para uso nas rotas
module.exports = { getById, create, update, remove };
