/**
 * TESTES — ETAPA 3: asyncHandler
 * Novidade: testa o próprio asyncHandler de forma isolada.
 * Verifica que erros são capturados e mapeados corretamente.
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/step3');

beforeEach(() => handlers._resetDb());

// ── Testa o asyncHandler isolado ──────────────────────────────────────────────
describe('asyncHandler', () => {
  it('chama a função interna com req e res', async () => {
    const fn = jest.fn();
    const wrapped = handlers.asyncHandler(fn);
    const req = makeReq();
    const res = makeRes();
    await wrapped(req, res);
    expect(fn).toHaveBeenCalledWith(req, res);
  });

  it('captura NotFoundError e responde com statusCode 404', async () => {
    const fn = async () => { throw new handlers.NotFoundError('não encontrado'); };
    const wrapped = handlers.asyncHandler(fn);
    const res = makeRes();
    await wrapped(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'não encontrado' });
  });

  it('captura ValidationError e responde com statusCode 400', async () => {
    const fn = async () => { throw new handlers.ValidationError('inválido'); };
    const wrapped = handlers.asyncHandler(fn);
    const res = makeRes();
    await wrapped(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'inválido' });
  });

  it('captura Error genérico e responde com 500', async () => {
    const fn = async () => { throw new Error('falha inesperada'); };
    const wrapped = handlers.asyncHandler(fn);
    const res = makeRes();
    await wrapped(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'falha inesperada' });
  });

  it('não captura se não há erro (caminho feliz)', async () => {
    const fn = async (req, res) => { res.status(200).json({ ok: true }); };
    const wrapped = handlers.asyncHandler(fn);
    const res = makeRes();
    await wrapped(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});

// ── Comportamento dos handlers inalterado ─────────────────────────────────────
describe('getAllPacientes', () => {
  it('retorna 200 com lista', async () => {
    const res = makeRes();
    await handlers.getAllPacientes(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ nome: 'João Silva' }),
    ]));
  });
});

describe('getPacienteById', () => {
  it('retorna 200 para id existente', async () => {
    const res = makeRes();
    await handlers.getPacienteById(makeReq({ id: '2' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Maria Santos' }));
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
    await handlers.updatePaciente(makeReq({ id: '1' }, { nome: 'Atualizado' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Atualizado' }));
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.updatePaciente(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('removePaciente', () => {
  it('retorna 204 ao remover', async () => {
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
  });

  it('retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.getNoticiaById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('createNoticia', () => {
  it('retorna 201', async () => {
    const res = makeRes();
    await handlers.createNoticia(makeReq({}, { titulo: 'T', conteudo: 'C' }), res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
