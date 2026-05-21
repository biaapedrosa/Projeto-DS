/**
 * TESTES — ETAPA 5: createCrudController (Factory)
 * Novidade: testa a factory isoladamente e verifica que os controllers
 * gerados têm o mesmo comportamento dos handlers anteriores.
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/step5');

beforeEach(() => handlers._resetDb());

// ── Testa a factory isolada ───────────────────────────────────────────────────
describe('createCrudController — factory', () => {
  let collection;
  let ctrl;

  beforeEach(() => {
    collection = [
      { id: 1, nome: 'Item A' },
      { id: 2, nome: 'Item B' },
    ];
    ctrl = handlers.createCrudController({
      getCollection: () => collection,
      notFoundMessage: 'Item não encontrado!',
    });
  });

  it('gera handler getAll que retorna 200 com a coleção', async () => {
    const res = makeRes();
    await ctrl.getAll(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ nome: 'Item A' }),
    ]));
  });

  it('gera handler getById que retorna 200 para id existente', async () => {
    const res = makeRes();
    await ctrl.getById(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Item A' }));
  });

  it('gera handler getById que retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await ctrl.getById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Item não encontrado!' });
  });

  it('gera handler create que retorna 201', async () => {
    const res = makeRes();
    await ctrl.create(makeReq({}, { nome: 'Item C' }), res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Item C' }));
  });

  it('gera handler update que retorna 200 e atualiza', async () => {
    const res = makeRes();
    await ctrl.update(makeReq({ id: '1' }, { nome: 'Item Atualizado' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Item Atualizado' }));
  });

  it('gera handler update que retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await ctrl.update(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('gera handler remove que retorna 204', async () => {
    const res = makeRes();
    await ctrl.remove(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('gera handler remove que retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await ctrl.remove(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

// ── Controllers reais gerados pela factory ────────────────────────────────────
describe('pacienteController (gerado pela factory)', () => {
  it('getAll retorna 200 com pacientes', async () => {
    const res = makeRes();
    await handlers.pacienteController.getAll(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ nome: 'João Silva' })])
    );
  });

  it('getById retorna 200 para id existente', async () => {
    const res = makeRes();
    await handlers.pacienteController.getById(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getById retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.pacienteController.getById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('update retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.pacienteController.update(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('remove retorna 204', async () => {
    const res = makeRes();
    await handlers.pacienteController.remove(makeReq({ id: '1' }), res);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});

describe('noticiaController (gerado pela factory)', () => {
  it('getAll retorna 200 com noticias', async () => {
    const res = makeRes();
    await handlers.noticiaController.getAll(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ titulo: 'Dieta mediterrânea' })])
    );
  });

  it('create retorna 201 com nova noticia', async () => {
    const res = makeRes();
    await handlers.noticiaController.create(makeReq({}, { titulo: 'Nova', conteudo: 'Texto' }), res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'Nova' }));
  });

  it('getById retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.noticiaController.getById(makeReq({ id: '999' }), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('update retorna 404 para id inexistente', async () => {
    const res = makeRes();
    await handlers.noticiaController.update(makeReq({ id: '999' }, {}), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
