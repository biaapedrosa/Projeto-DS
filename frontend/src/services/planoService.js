// Importa a instância configurada do axios com o token de autenticação automático
import api from './api';

// Busca um plano alimentar pelo seu ID
// (ex: GET /api/planos/1)
const getById = async (id) => {
  const response = await api.get(`/api/planos/${id}`);
  return response.data; // retorna o objeto do plano alimentar
};

// Busca todos os planos alimentares de um paciente específico
// (ex: GET /api/pacientes/2/planos)
// Usado no Dashboard para exibir o plano atual e o histórico do paciente
const getByPaciente = async (pacienteId) => {
  const response = await api.get(`/api/pacientes/${pacienteId}/planos`);
  return response.data; // retorna um array de planos
};

// Exporta as funções para serem usadas nos componentes de página
export default { getById, getByPaciente };
