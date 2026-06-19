const repo = require('../repositories/pacienteDashboardRepository');
const pacienteRepo = require('../repositories/pacienteRepository');

// Retorna os dados do card da home: info do paciente + última consulta
const getResumoHome = async (paciente_id) => {
  const resumo = await repo.findResumoHome(paciente_id);
  if (!resumo) throw new Error('Paciente não encontrado.');

  const ultimaConsulta = resumo.consultas?.[0] ?? null;

  return {
    paciente: {
      id: resumo.id,
      nome: resumo.nome,
      objetivo: resumo.objetivo,
    },
    ultima_consulta: ultimaConsulta
      ? {
          id: ultimaConsulta.id,
          data: ultimaConsulta.data_consulta,
          nutricionista: ultimaConsulta.nutricionista,
        }
      : null,
  };
};

// Retorna o plano alimentar vigente (mais recente) do paciente
const getPlanoVigente = async (paciente_id) => {
  const paciente = await pacienteRepo.findById(paciente_id);
  if (!paciente) throw new Error('Paciente não encontrado.');

  const plano = await repo.findPlanoVigente(paciente_id);
  if (!plano) throw new Error('Nenhum plano alimentar encontrado para este paciente.');

  return formatarPlano(plano);
};

// Retorna a lista de todos os planos históricos (sem detalhe)
const getHistoricoPlanos = async (paciente_id) => {
  const paciente = await pacienteRepo.findById(paciente_id);
  if (!paciente) throw new Error('Paciente não encontrado.');

  const planos = await repo.findHistoricoPlanos(paciente_id);

  return planos.map((p) => ({
    id: p.id,
    data: p.data,
    nutricionista: p.nutricionista,
    total_refeicoes: p.refeicoes.length,
    refeicoes_nomes: p.refeicoes.map((r) => r.nome),
  }));
};

// Retorna um plano completo pelo id, verificando que pertence ao paciente
const getPlanoById = async (plano_id, paciente_id) => {
  const paciente = await pacienteRepo.findById(paciente_id);
  if (!paciente) throw new Error('Paciente não encontrado.');

  const plano = await repo.findPlanoById(plano_id, paciente_id);
  if (!plano) throw new Error('Plano não encontrado ou não pertence a este paciente.');

  return formatarPlano(plano);
};

// Formata o plano para retorno padronizado
const formatarPlano = (plano) => ({
  id: plano.id,
  data: plano.data,
  nutricionista: plano.nutricionista,
  refeicoes: plano.refeicoes.map((r) => ({
    id: r.id,
    nome: r.nome,
    descricao: r.descricao,
    horario: r.horario,
    observacao: r.observacao,
    opcoes: r.opcoes.map((o) => ({
      id: o.id,
      nome: o.nome,
      observacao: o.observacao,
      alimentos: o.alimentos.map((a) => ({
        id: a.id,
        nome: a.nome,
      })),
    })),
  })),
});

module.exports = {
  getResumoHome,
  getPlanoVigente,
  getHistoricoPlanos,
  getPlanoById,
};