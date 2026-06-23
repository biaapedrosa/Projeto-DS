const prisma = require('../db');

// Busca o plano mais recente do paciente (plano vigente)
const findPlanoVigente = (paciente_id) =>
  prisma.planoRefeicao.findFirst({
    where: { paciente_id: Number(paciente_id) },
    orderBy: { data: 'desc' },
    include: {
      nutricionista: { select: { id: true, nome: true, crn: true } },
      refeicoes: {
        orderBy: { horario: 'asc' },
        include: {
          opcoes: {
            include: { alimentos: true },
          },
        },
      },
    },
  });

// Busca todos os planos históricos do paciente (sem detalhe de refeições para lista leve)
const findHistoricoPlanos = (paciente_id) =>
  prisma.planoRefeicao.findMany({
    where: { paciente_id: Number(paciente_id) },
    orderBy: { data: 'desc' },
    include: {
      nutricionista: { select: { id: true, nome: true } },
      refeicoes: { select: { id: true, nome: true } },
    },
  });

// Busca um plano completo pelo id, validando que pertence ao paciente
const findPlanoById = (plano_id, paciente_id) =>
  prisma.planoRefeicao.findFirst({
    where: {
      id: Number(plano_id),
      paciente_id: Number(paciente_id),
    },
    include: {
      nutricionista: { select: { id: true, nome: true, crn: true } },
      refeicoes: {
        orderBy: { horario: 'asc' },
        include: {
          opcoes: {
            include: { alimentos: true },
          },
        },
      },
    },
  });

// Busca dados resumidos do paciente + última consulta para o card da home
const findResumoHome = (paciente_id) =>
  prisma.paciente.findUnique({
    where: { id: Number(paciente_id) },
    select: {
      id: true,
      nome: true,
      objetivo: true,
      consultas: {
        orderBy: { data_consulta: 'desc' },
        take: 1,
        select: {
          id: true,
          data_consulta: true,
          nutricionista: { select: { id: true, nome: true } },
        },
      },
    },
  });

module.exports = {
  findPlanoVigente,
  findHistoricoPlanos,
  findPlanoById,
  findResumoHome,
};