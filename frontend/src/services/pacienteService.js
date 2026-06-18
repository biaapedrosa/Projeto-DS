import api from './api';

const getAll = async () => {
  const response = await api.get('/api/pacientes');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/pacientes/${id}`);
  return response.data;
};

const create = async (dados) => {
  const response = await api.post('/api/pacientes', dados);
  return response.data;
};

const update = async (id, dados) => {
  const response = await api.put(`/api/pacientes/${id}`, dados);
  return response.data;
};

const getPlanos = async (id) => {
  const response = await api.get(`/api/pacientes/${id}/planos`);
  return response.data;
};

export default { getAll, getById, create, update, getPlanos };