const prisma = require('./helpers/prisma');
const pacienteService = require('../services/pacienteService');
const noticiaService = require('../services/noticiaService');
const planoService = require('../services/planoAlimentarService');
const nutricionistaService = require('../services/nutricionistaService');
const ID_INEXISTENTE = 999999;

describe('Consistência dos serviços — update em registro inexistente', () => {
  it('pacienteService.update lança "Paciente não encontrado!"', async () => {
    await expect(pacienteService.update(ID_INEXISTENTE, { nome: 'X' }))
      .rejects.toThrow('Paciente não encontrado!');
  });

  it('noticiaService.update lança "Notícia não encontrada!"', async () => {
    await expect(noticiaService.update(ID_INEXISTENTE, { titulo: 'X' }))
      .rejects.toThrow('Notícia não encontrada!');
  });

  it('planoService.update lança "Plano não encontrado!"', async () => {
    await expect(planoService.update(ID_INEXISTENTE, { data: new Date() }))
      .rejects.toThrow('Plano não encontrado!');
  });
});

describe('Consistência dos serviços — remove em registro inexistente', () => {
  it('pacienteService.remove lança "Paciente não encontrado!"', async () => {
    await expect(pacienteService.remove(ID_INEXISTENTE))
      .rejects.toThrow('Paciente não encontrado!');
  });

  it('noticiaService.remove lança "Notícia não encontrada!"', async () => {
    await expect(noticiaService.remove(ID_INEXISTENTE))
      .rejects.toThrow('Notícia não encontrada!');
  });

  it('planoService.remove lança "Plano não encontrado!"', async () => {
    await expect(planoService.remove(ID_INEXISTENTE))
      .rejects.toThrow('Plano não encontrado!');
  });

  it('nutricionistaService.remove lança "Nutricionista não encontrado!"', async () => {
    await expect(nutricionistaService.remove(ID_INEXISTENTE))
      .rejects.toThrow('Nutricionista não encontrado!');
  });
});

describe('Consistência dos serviços — caminho feliz (registro existe)', () => {
  it('pacienteService.update altera quando o paciente existe', async () => {
    const paciente = await prisma.paciente.create({
      data: { nome: 'Original', email: 'original@teste.com', senha: 'hash' },
    });
    const atualizado = await pacienteService.update(paciente.id, { nome: 'Atualizado' });
    expect(atualizado.nome).toBe('Atualizado');
  });

  it('noticiaService.remove remove quando a notícia existe', async () => {
    const noticia = await prisma.noticia.create({ data: { titulo: 'T', conteudo: 'C' } });
    await noticiaService.remove(noticia.id);
    const depois = await prisma.noticia.findUnique({ where: { id: noticia.id } });
    expect(depois).toBeNull();
  });

  it('nutricionistaService.remove remove quando o nutricionista existe', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dr. X', cpf: '12312312312', email: 'drx@teste.com', telefone: '81900000000', senha: 'hash' },
    });
    await nutricionistaService.remove(nutri.id);
    const depois = await prisma.nutricionista.findUnique({ where: { id: nutri.id } });
    expect(depois).toBeNull();
  });
});

describe('Plano alimentar — alinhado ao schema PlanoRefeicao', () => {
  const criarPacienteENutri = async () => {
    const paciente = await prisma.paciente.create({
      data: { nome: 'Paciente Plano', email: 'plano.pac@teste.com', senha: 'hash' },
    });
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Nutri Plano', cpf: '55566677788', email: 'plano.nut@teste.com', telefone: '81911112222', senha: 'hash' },
    });
    return { paciente, nutri };
  };

  it('cria um plano com refeições aninhadas e lê de volta a árvore completa', async () => {
    const { paciente, nutri } = await criarPacienteENutri();

    const plano = await planoService.create({
      paciente_id: paciente.id,
      nutricionista_id: nutri.id,
      data: '2026-06-04T10:00:00.000Z',
      refeicoes: [
        {
          nome: 'Café da manhã',
          opcoes: [{ nome: 'Opção 1', alimentos: [{ nome: 'Pão integral' }, { nome: 'Ovo' }] }],
        },
      ],
    });

    expect(plano.id).toBeDefined();
    expect(plano.refeicoes).toHaveLength(1);
    expect(plano.refeicoes[0].nome).toBe('Café da manhã');
    expect(plano.refeicoes[0].opcoes[0].alimentos).toHaveLength(2);

    const lido = await planoService.getById(plano.id);
    expect(lido.refeicoes[0].opcoes[0].alimentos[0].nome).toBe('Pão integral');
  });

  it('cria um plano sem refeições (apenas data e vínculos)', async () => {
    const { paciente, nutri } = await criarPacienteENutri();
    const plano = await planoService.create({
      paciente_id: paciente.id,
      nutricionista_id: nutri.id,
      data: '2026-06-04T10:00:00.000Z',
    });
    expect(plano.id).toBeDefined();
    expect(plano.refeicoes).toEqual([]);
  });

  it('rejeita criação sem os campos obrigatórios', async () => {
    await expect(planoService.create({ paciente_id: 1 }))
      .rejects.toThrow(/obrigatórios/i);
  });

  it('remove um plano e sua árvore de refeições em cascata', async () => {
    const { paciente, nutri } = await criarPacienteENutri();
    const plano = await planoService.create({
      paciente_id: paciente.id,
      nutricionista_id: nutri.id,
      data: '2026-06-04T10:00:00.000Z',
      refeicoes: [{ nome: 'Almoço', opcoes: [{ nome: 'Opção A', alimentos: [{ nome: 'Arroz' }] }] }],
    });

    await planoService.remove(plano.id);

    expect(await prisma.planoRefeicao.findUnique({ where: { id: plano.id } })).toBeNull();
    expect(await prisma.refeicao.count({ where: { plano_id: plano.id } })).toBe(0);
  });
});