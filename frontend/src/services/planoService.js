import api from './api';

const getById = async (id) => {
  const response = await api.get(`/api/planos/${id}`);
  return response.data;
};

const getByPaciente = async (pacienteId) => {
  const response = await api.get(`/api/pacientes/${pacienteId}/planos`);
  return response.data;
};

const create = async (dados) => {
  const response = await api.post('/api/planos', dados);
  return response.data;
};

export default { getById, getByPaciente, create };