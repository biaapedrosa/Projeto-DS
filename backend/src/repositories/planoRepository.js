const prisma = require('../db');

const planoInclude = {
  refeicoes: {
    include: {
      opcoes: {
        include: {
          alimentos: {
            include: { alimentoTaco: true },
          },
        },
      },
    },
  },
};

const buildRefeicoesCreate = (refeicoes) => {
  if (!Array.isArray(refeicoes) || refeicoes.length === 0) return undefined;

  return {
    create: refeicoes.map((refeicao) => ({
      nome: refeicao.nome,
      descricao: refeicao.descricao ?? null,
      horario: refeicao.horario ?? null,
      observacao: refeicao.observacao ?? null,
      opcoes: buildOpcoesCreate(refeicao.opcoes),
    })),
  };
};

const buildOpcoesCreate = (opcoes) => {
  if (!Array.isArray(opcoes) || opcoes.length === 0) return undefined;

  return {
    create: opcoes.map((opcao) => ({
      nome: opcao.nome,
      observacao: opcao.observacao ?? null,
      alimentos: buildAlimentosCreate(opcao.alimentos),
    })),
  };
};

const buildAlimentosCreate = (alimentos) => {
  if (!Array.isArray(alimentos) || alimentos.length === 0) return undefined;

  return {
    create: alimentos.map((alimento) => ({
      nome: alimento.nome,
      alimento_taco_id: alimento.alimento_taco_id ?? null,
    })),
  };
};

const findById = (id) =>
  prisma.planoRefeicao.findUnique({
    where: { id: Number(id) },
    include: planoInclude,
  });

const findByPacienteId = (paciente_id) =>
  prisma.planoRefeicao.findMany({
    where: { paciente_id: Number(paciente_id) },
    include: planoInclude,
    orderBy: { data: 'desc' },
  });

const create = ({ paciente_id, nutricionista_id, data, refeicoes }) =>
  prisma.planoRefeicao.create({
    data: {
      paciente_id: Number(paciente_id),
      nutricionista_id: Number(nutricionista_id),
      data: new Date(data),
      refeicoes: buildRefeicoesCreate(refeicoes),
    },
    include: planoInclude,
  });

const update = (id, dados) => {
  const data = {};
  if (dados.data !== undefined) data.data = new Date(dados.data);
  if (dados.paciente_id !== undefined) data.paciente_id = Number(dados.paciente_id);
  if (dados.nutricionista_id !== undefined) data.nutricionista_id = Number(dados.nutricionista_id);

  return prisma.planoRefeicao.update({
    where: { id: Number(id) },
    data,
    include: planoInclude,
  });
};

const remove = (id) =>
  prisma.$transaction(async (tx) => {
    const planoId = Number(id);

    const refeicoes = await tx.refeicao.findMany({
      where: { plano_id: planoId },
      select: { id: true },
    });
    const refeicaoIds = refeicoes.map((r) => r.id);

    if (refeicaoIds.length > 0) {
      const opcoes = await tx.opcao.findMany({
        where: { refeicao_id: { in: refeicaoIds } },
        select: { id: true },
      });
      const opcaoIds = opcoes.map((o) => o.id);

      if (opcaoIds.length > 0) {
        await tx.alimento.deleteMany({ where: { opcao_id: { in: opcaoIds } } });
        await tx.opcao.deleteMany({ where: { id: { in: opcaoIds } } });
      }
      await tx.refeicao.deleteMany({ where: { id: { in: refeicaoIds } } });
    }

    return tx.planoRefeicao.delete({ where: { id: planoId } });
  });

module.exports = { findById, findByPacienteId, create, update, remove };