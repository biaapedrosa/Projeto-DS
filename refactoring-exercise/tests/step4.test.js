/**
 * TESTES — ETAPA 4: findOrFail / findWithIndexOrFail
 * Novidade: testa os utilitários de busca isoladamente.
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/step4');

beforeEach(() => handlers._resetDb());

// ── Testa findOrFail isolado ──────────────────────────────────────────────────
describe('findOrFail', () => {
  const { findOrFail, NotFoundError } = handlers;
  const lista = [{ id: 1, nome: 'A' }, { id: 2, nome: 'B' }];

  it('retorna o item quando encontrado', () => {
    const item = findOrFail(lista, '1', 'não encontrado');
    expect(item).toEqual({ id: 1, nome: 'A' });
  });

  it('funciona com id numérico também', () => {
    const item = findOrFail(lista, 2, 'não encontrado');
    expect(item).toEqual({ id: 2, nome: 'B' });
  });

  it('lança NotFoundError quando não encontrado', () => {
    expect(() => findOrFail(lista, '999', 'não encontrado'))
      .toThrow(NotFoundError);
  });

  it('a mensagem do erro vem do parâmetro', () => {
    expect(() => findOrFail(lista, '999', 'Paciente não encontrado!'))
      .toThrow('Paciente não encontrado!');
  });
});

// ── Testa findWithIndexOrFail isolado ─────────────────────────────────────────
describe('findWithIndexOrFail', () => {
  const { findWithIndexOrFail, NotFoundError } = handlers;
  const lista = [{ id: 1, nome: 'A' }, { id: 2, nome: 'B' }];

  it('retorna [item, índice] quando encontrado', () => {
    const [item, idx] = findWithIndexOrFail(lista, '2', 'não encontrado');
    expect(item).toEqual({ id: 2, nome: 'B' });
    expect(idx).toBe(1);
  });

  it('lança NotFoundError quando não encontrado', () => {
    expect(() => findWithIndexOrFail(lista, '999', 'não encontrado'))
      .toThrow(NotFoundError);
  });
});

// ── Comportamento dos handlers inalterado ─────────────────────────────────────
describe('getPacienteById', () => {
  it('retorna 200 para id existente', async () => {
    const res = makeRes();
    await handlers.getPacienteById(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'João Silva' }));
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.getPacienteById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('updatePaciente', () => {
  it('atualiza e retorna 200', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '1' }, { nome: 'João Novo' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'João Novo' }));
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('removePaciente', () => {
  it('retorna 204 e remove o paciente', async () => {
    const res = makeRes();
    await handlers.removePaciente(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});

describe('getNoticiaById', () => {
  it('retorna 200 para id existente', async () => {
    const res = makeRes();
    await handlers.getNoticiaById(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ titulo: 'Dieta mediterrânea' })
    );
  });
});

describe('updateNoticia', () => {
  it('atualiza e retorna 200', async () => {
    const res = makeRes();
    await handlers.updateNoticia(makeReq({ id: '1' }, { titulo: 'Título novo' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'Título novo' }));
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.updateNoticia(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
