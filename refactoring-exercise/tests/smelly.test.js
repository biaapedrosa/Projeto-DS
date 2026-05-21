/**
 * TESTES BASELINE — código smelly original
 * Estes testes documentam o comportamento ATUAL (com os bugs incluídos).
 * Nas etapas seguintes, os testes evoluem junto com o código.
 */
const { makeRes, makeReq } = require('./helpers');
const handlers = require('../src/smelly');

beforeEach(() => handlers._resetDb());

// ─────────────────────────────────────────────────────────────────────────────
// PACIENTE
// ─────────────────────────────────────────────────────────────────────────────

describe('getAllPacientes', () => {
  it('retorna 200 com lista de pacientes', async () => {
    const req = makeReq();
    const res = makeRes();
    await handlers.getAllPacientes(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ nome: 'João Silva' })])
    );
  });
});

describe('getPacienteById', () => {
  it('retorna 200 com paciente existente', async () => {
    const req = makeReq({ id: '1' });
    const res = makeRes();
    await handlers.getPacienteById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('retorna 404 para id inexistente', async () => {
    const req = makeReq({ id: '999' });
    const res = makeRes();
    await handlers.getPacienteById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Paciente não encontrado!' });
  });
});

describe('updatePaciente', () => {
  it('retorna 200 com paciente atualizado', async () => {
    const req = makeReq({ id: '1' }, { nome: 'João Atualizado' });
    const res = makeRes();
    await handlers.updatePaciente(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'João Atualizado' }));
  });

  // SMELL 4 documentado: update retorna 400 em vez de 404 para "não encontrado"
  it('[SMELL 4] retorna 400 (incorreto) para id inexistente — deveria ser 404', async () => {
    const req = makeReq({ id: '999' }, { nome: 'X' });
    const res = makeRes();
    await handlers.updatePaciente(req, res);
    expect(res.status).toHaveBeenCalledWith(400); // bug documentado
  });
});

describe('removePaciente', () => {
  it('retorna 204 ao remover paciente existente', async () => {
    const req = makeReq({ id: '1' });
    const res = makeRes();
    await handlers.removePaciente(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('retorna 404 para id inexistente', async () => {
    const req = makeReq({ id: '999' });
    const res = makeRes();
    await handlers.removePaciente(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA
// ─────────────────────────────────────────────────────────────────────────────

describe('getAllNoticias', () => {
  it('retorna 200 com lista de noticias', async () => {
    const req = makeReq();
    const res = makeRes();
    await handlers.getAllNoticias(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ titulo: 'Dieta mediterrânea' })])
    );
  });
});

describe('getNoticiaById', () => {
  it('retorna 200 com noticia existente', async () => {
    const req = makeReq({ id: '1' });
    const res = makeRes();
    await handlers.getNoticiaById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('retorna 404 para id inexistente', async () => {
    const req = makeReq({ id: '999' });
    const res = makeRes();
    await handlers.getNoticiaById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('createNoticia', () => {
  it('retorna 201 com noticia criada', async () => {
    const req = makeReq({}, { titulo: 'Nova Dieta', conteudo: 'Conteúdo.' });
    const res = makeRes();
    await handlers.createNoticia(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'Nova Dieta' }));
  });
});

describe('updateNoticia', () => {
  it('retorna 200 com noticia atualizada', async () => {
    const req = makeReq({ id: '1' }, { titulo: 'Título Novo' });
    const res = makeRes();
    await handlers.updateNoticia(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'Título Novo' }));
  });

  // SMELL 4 documentado: update retorna 400 em vez de 404
  it('[SMELL 4] retorna 400 (incorreto) para id inexistente — deveria ser 404', async () => {
    const req = makeReq({ id: '999' }, { titulo: 'X' });
    const res = makeRes();
    await handlers.updateNoticia(req, res);
    expect(res.status).toHaveBeenCalledWith(400); // bug documentado
  });
});

describe('removeNoticia', () => {
  it('retorna 204 ao remover noticia existente', async () => {
    const req = makeReq({ id: '1' });
    const res = makeRes();
    await handlers.removeNoticia(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('retorna 404 para id inexistente', async () => {
    const req = makeReq({ id: '999' });
    const res = makeRes();
    await handlers.removeNoticia(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
