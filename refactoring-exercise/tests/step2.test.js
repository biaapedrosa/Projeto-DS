/**
 * TESTES — ETAPA 2: Custom Error Classes
 * Novidade: o bug do Smell 4 foi corrigido.
 * updatePaciente e updateNoticia agora retornam 404 para "não encontrado".
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/step2');

beforeEach(() => handlers._resetDb());

// ── Testa a hierarquia de erros ───────────────────────────────────────────────
describe('AppError hierarchy', () => {
  it('NotFoundError tem statusCode 404', () => {
    const err = new handlers.NotFoundError('não encontrado');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('não encontrado');
    expect(err instanceof handlers.AppError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });

  it('ValidationError tem statusCode 400', () => {
    const err = new handlers.ValidationError('dado inválido');
    expect(err.statusCode).toBe(400);
    expect(err instanceof handlers.AppError).toBe(true);
  });

  it('NotFoundError.name é "NotFoundError"', () => {
    expect(new handlers.NotFoundError('x').name).toBe('NotFoundError');
  });
});

// ── Comportamento inalterado ──────────────────────────────────────────────────
describe('getPacienteById', () => {
  it('retorna 200 para id existente', async () => {
    const res = makeRes();
    await handlers.getPacienteById(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.getPacienteById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

// ── Smell 4 CORRIGIDO ─────────────────────────────────────────────────────────
describe('updatePaciente — Smell 4 corrigido', () => {
  it('retorna 200 ao atualizar paciente existente', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '1' }, { nome: 'Novo' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('agora retorna 404 (correto) para id inexistente', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404); // ✓ bug corrigido!
    expect(res.json).toHaveBeenCalledWith({ error: 'Paciente não encontrado!' });
  });
});

describe('updateNoticia — Smell 4 corrigido', () => {
  it('agora retorna 404 (correto) para id inexistente', async () => {
    const res = makeRes();
    await handlers.updateNoticia(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404); // ✓ bug corrigido!
  });
});

describe('removePaciente', () => {
  it('retorna 204 ao remover', async () => {
    const res = makeRes();
    await handlers.removePaciente(makeReq({ id: '2' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.removePaciente(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('createNoticia', () => {
  it('retorna 201 com nova noticia', async () => {
    const res = makeRes();
    await handlers.createNoticia(makeReq({}, { titulo: 'Nova', conteudo: 'Texto' }), res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe('getAllNoticias', () => {
  it('retorna 200 com lista', async () => {
    const res = makeRes();
    await handlers.getAllNoticias(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
