const prisma = require('./helpers/prisma');
const nutricionistaService = require('../services/nutricionistaService');
const ID_INEXISTENTE = 999999;

describe('nutricionistaService.getById', () => {
  it('lança "Nutricionista não encontrado!" para id inexistente', async () => {
    await expect(nutricionistaService.getById(ID_INEXISTENTE))
      .rejects.toThrow('Nutricionista não encontrado!');
  });

  it('retorna o nutricionista quando existe', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dra. Get', cpf: '11122233300', email: 'dra.get@teste.com', telefone: '81900000001', senha: 'hash' },
    });

    const encontrado = await nutricionistaService.getById(nutri.id);
    expect(encontrado.id).toBe(nutri.id);
    expect(encontrado.nome).toBe('Dra. Get');
  });
});

describe('nutricionistaService.update', () => {
  it('lança "Nutricionista não encontrado!" para id inexistente', async () => {
    await expect(nutricionistaService.update(ID_INEXISTENTE, { nome: 'X' }))
      .rejects.toThrow('Nutricionista não encontrado!');
  });

  it('altera os dados quando o nutricionista existe', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dra. Antiga', cpf: '11122233301', email: 'dra.update@teste.com', telefone: '81900000002', senha: 'hash' },
    });

    const atualizado = await nutricionistaService.update(nutri.id, { nome: 'Dra. Nova' });
    expect(atualizado.nome).toBe('Dra. Nova');
  });
});
