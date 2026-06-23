const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const prisma = require('./helpers/prisma');

const secret = process.env.JWT_SECRET;
const sign = (payload) => jwt.sign(payload, secret, { expiresIn: '1h' });

const tokenPaciente = sign({ id: 1, nome: 'Paciente', email: 'paciente@teste.com', tipo: 'paciente' });
const tokenNutri = sign({ id: 1, nome: 'Nutri', email: 'nutri@teste.com', tipo: 'nutricionista', role: 'nutricionista' });
const tokenAdmin = sign({ id: 2, nome: 'Admin', email: 'admin@teste.com', tipo: 'nutricionista', role: 'admin' });

const bearer = (token) => `Bearer ${token}`;

describe('Autenticação (middleware auth)', () => {
  it('rejeita requisição sem token com 401', async () => {
    const res = await request(app).get('/api/nutricionistas');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token não fornecido!');
  });

  it('rejeita token inválido com 403', async () => {
    const res = await request(app)
      .get('/api/nutricionistas')
      .set('Authorization', bearer('token.invalido.aqui'));
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Token inválido!');
  });

  it('aceita token válido (passa pelo middleware auth, não retorna 401)', async () => {
    // Token válido deve passar pela autenticação. O 403 por perfil é checado
    // adiante; aqui só garantimos que o middleware aceitou o token.
    const res = await request(app)
      .get('/api/nutricionistas')
      .set('Authorization', bearer(tokenPaciente));
    expect(res.status).not.toBe(401);
  });
});

describe('Autorização por perfil — /api/planos', () => {
  it('sem token → 401', async () => {
    const res = await request(app).post('/api/planos').send({});
    expect(res.status).toBe(401);
  });

  it('paciente não pode criar plano → 403', async () => {
    const res = await request(app)
      .post('/api/planos')
      .set('Authorization', bearer(tokenPaciente))
      .send({ paciente_id: 1, nutricionista_id: 1 });
    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/não autorizado/i);
  });

  it('paciente não pode editar plano → 403', async () => {
    const res = await request(app)
      .put('/api/planos/1')
      .set('Authorization', bearer(tokenPaciente))
      .send({});
    expect(res.status).toBe(403);
  });

  it('paciente não pode remover plano → 403', async () => {
    const res = await request(app)
      .delete('/api/planos/1')
      .set('Authorization', bearer(tokenPaciente));
    expect(res.status).toBe(403);
  });

  it('nutricionista passa pela autorização (não recebe 401/403)', async () => {
    const res = await request(app)
      .post('/api/planos')
      .set('Authorization', bearer(tokenNutri))
      .send({ paciente_id: 1, nutricionista_id: 1 });
    expect(res.status).not.toBe(401);
    expect(res.status).not.toBe(403);
  });

  it('GET de plano exige apenas autenticação', async () => {
    const semToken = await request(app).get('/api/planos/1');
    expect(semToken.status).toBe(401);

    const comToken = await request(app)
      .get('/api/planos/1')
      .set('Authorization', bearer(tokenPaciente));
    expect(comToken.status).not.toBe(401);
    expect(comToken.status).not.toBe(403);
  });
});

describe('Autorização por perfil — /api/noticias', () => {
  it('GET é público (200 sem token)', async () => {
    const res = await request(app).get('/api/noticias');
    expect(res.status).toBe(200);
  });

  it('criar sem token → 401', async () => {
    const res = await request(app).post('/api/noticias').send({ titulo: 'T', conteudo: 'C' });
    expect(res.status).toBe(401);
  });

  it('paciente não pode criar notícia → 403', async () => {
    const res = await request(app)
      .post('/api/noticias')
      .set('Authorization', bearer(tokenPaciente))
      .send({ titulo: 'T', conteudo: 'C' });
    expect(res.status).toBe(403);
  });

  it('nutricionista cria notícia → 201', async () => {
    const res = await request(app)
      .post('/api/noticias')
      .set('Authorization', bearer(tokenNutri))
      .send({ titulo: 'Dica de nutrição', conteudo: 'Beba água.' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('admin cria notícia → 201', async () => {
    const res = await request(app)
      .post('/api/noticias')
      .set('Authorization', bearer(tokenAdmin))
      .send({ titulo: 'Aviso', conteudo: 'Conteúdo do aviso.' });
    expect(res.status).toBe(201);
  });

  it('paciente não pode editar/remover notícia → 403', async () => {
    const noticia = await prisma.noticia.create({ data: { titulo: 'X', conteudo: 'Y' } });

    const put = await request(app)
      .put(`/api/noticias/${noticia.id}`)
      .set('Authorization', bearer(tokenPaciente))
      .send({ titulo: 'Z' });
    expect(put.status).toBe(403);

    const del = await request(app)
      .delete(`/api/noticias/${noticia.id}`)
      .set('Authorization', bearer(tokenPaciente));
    expect(del.status).toBe(403);
  });
});

describe('Autorização por perfil — /api/nutricionistas', () => {
  it('listar exige autenticação (401 sem token)', async () => {
    const res = await request(app).get('/api/nutricionistas');
    expect(res.status).toBe(401);
  });

  it('paciente não pode listar nutricionistas → 403', async () => {
    const res = await request(app)
      .get('/api/nutricionistas')
      .set('Authorization', bearer(tokenPaciente));
    expect(res.status).toBe(403);
  });

  it('nutricionista pode listar nutricionistas → 200 (sem expor senha)', async () => {
    const res = await request(app)
      .get('/api/nutricionistas')
      .set('Authorization', bearer(tokenNutri));
    expect(res.status).toBe(200);
    res.body.forEach((n) => expect(n.senha).toBeUndefined());
  });

  it('nutricionista comum não pode cadastrar nutricionista → 403', async () => {
    const res = await request(app)
      .post('/api/nutricionistas')
      .set('Authorization', bearer(tokenNutri))
      .send({ nome: 'Novo', cpf: '11122233344', email: 'novo@teste.com', telefone: '81999990000', senha: '123' });
    expect(res.status).toBe(403);
  });

  it('admin cadastra nutricionista → 201', async () => {
    const res = await request(app)
      .post('/api/nutricionistas')
      .set('Authorization', bearer(tokenAdmin))
      .send({ nome: 'Dra. Ana', cpf: '11122233344', email: 'ana@teste.com', telefone: '81999990000', crn: 'CRN1234', senha: '123' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('nutricionista comum não pode remover nutricionista → 403', async () => {
    const res = await request(app)
      .delete('/api/nutricionistas/1')
      .set('Authorization', bearer(tokenNutri));
    expect(res.status).toBe(403);
  });

  it('admin remove nutricionista → 204', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dr. Para Remover', cpf: '99988877766', email: 'remover@teste.com', telefone: '81988887777', senha: 'hash' },
    });
    const res = await request(app)
      .delete(`/api/nutricionistas/${nutri.id}`)
      .set('Authorization', bearer(tokenAdmin));
    expect(res.status).toBe(204);
  });
});