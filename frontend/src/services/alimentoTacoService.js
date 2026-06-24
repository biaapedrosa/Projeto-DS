import api from './api';

// Lista todos os alimentos da tabela TACO
const findAll = async () => {
  const response = await api.get('/api/alimentos-taco');
  return response.data;
};

// Busca alimentos por termo (mínimo 2 caracteres no backend)
const search = async (termo) => {
  const response = await api.get('/api/alimentos-taco', {
    params: { busca: termo },
  });
  return response.data;
};

// Retorna um alimento específico (com toda a tabela nutricional)
const getById = async (id) => {
  const response = await api.get(`/api/alimentos-taco/${id}`);
  return response.data;
};

export default { findAll, search, getById };