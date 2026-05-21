/**
 * TESTES — ETAPA 1: Extract Constant (Magic Numbers)
 * Comportamento idêntico ao baseline.
 * Teste extra: verifica que as constantes existem e têm os valores corretos.
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/step1');

beforeEach(() => handlers._resetDb());

// ── Testa a nova constante ────────────────────────────────────────────────────
describe('HTTP constants', () => {
  it('HTTP.OK é 200', () => expect(handlers.HTTP.OK).toBe(200));
  it('HTTP.CREATED é 201', () => expect(handlers.HTTP.CREATED).toBe(201));
  it('HTTP.NO_CONTENT é 204', () => expect(handlers.HTTP.NO_CONTENT).toBe(204));
  it('HTTP.BAD_REQUEST é 400', () => expect(handlers.HTTP.BAD_REQUEST).toBe(400));
  it('HTTP.NOT_FOUND é 404', () => expect(handlers.HTTP.NOT_FOUND).toBe(404));
});

// ── Comportamento inalterado ──────────────────────────────────────────────────
describe('getAllPacientes', () => {
  it('retorna 200 com lista', async () => {
    const res = makeRes();
    await handlers.getAllPacientes(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

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

describe('updatePaciente', () => {
  it('retorna 200 ao atualizar', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '1' }, { nome: 'Novo Nome' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Novo Nome' }));
  });

  // SMELL 4 ainda presente nesta etapa
  it('[SMELL 4 ainda presente] retorna 400 para id inexistente', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('removePaciente', () => {
  it('retorna 204 ao remover', async () => {
    const res = makeRes();
    await handlers.removePaciente(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});

describe('getAllNoticias', () => {
  it('retorna 200 com lista', async () => {
    const res = makeRes();
    await handlers.getAllNoticias(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('createNoticia', () => {
  it('retorna 201 com nova noticia', async () => {
    const res = makeRes();
    await handlers.createNoticia(makeReq({}, { titulo: 'T', conteudo: 'C' }), res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'T' }));
  });
});

describe('removeNoticia', () => {
  it('retorna 204 ao remover', async () => {
    const res = makeRes();
    await handlers.removeNoticia(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
