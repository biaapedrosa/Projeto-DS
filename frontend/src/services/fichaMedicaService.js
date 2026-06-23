import api from './api';

const getByPaciente = async (pacienteId) => {
  const response = await api.get(`/api/consultas/paciente/${pacienteId}`);
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/consultas/${id}`);
  return response.data;
};

const create = async (dados) => {
  const response = await api.post('/api/consultas', dados);
  return response.data;
};

export default { getByPaciente, getById, create };