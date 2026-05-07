import api from './api';

export const getPlano = async (id) => {
  const { data } = await api.get(`/planos/${id}`);
  return data;
};

export const getPlanosByPaciente = async (pacienteId) => {
  const { data } = await api.get(`/pacientes/${pacienteId}/planos`);
  return data;
};

export const createPlano = async (plano) => {
  const { data } = await api.post('/planos', plano);
  return data;
};

export const updatePlano = async (id, plano) => {
  const { data } = await api.put(`/planos/${id}`, plano);
  return data;
};

export const deletePlano = async (id) => {
  await api.delete(`/planos/${id}`);
};
