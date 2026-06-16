const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const prisma = require('./helpers/prisma');

const secret = process.env.JWT_SECRET;
const sign = (payload) => jwt.sign(payload, secret, { expiresIn: '1h' });

const tokenPaciente = sign({ id: 1, nome: 'Paciente', email: 'paciente@teste.com', tipo: 'paciente' });
const tokenNutri = sign({ id: 1, nome: 'Nutri', email: 'nutri@teste.com', tipo: 'nutricionista', role: 'nutricionista' });

const bearer = (token) => `Bearer ${token}`;

describe('GET /api/nutricionistas/:id', () => {
  it('exige autenticação (401 sem token)', async () => {
    const res = await request(app).get('/api/nutricionistas/1');
    expect(res.status).toBe(401);
  });

  it('retorna 404 para id inexistente', async () => {
    const res = await request(app)
      .get('/api/nutricionistas/999999')
      .set('Authorization', bearer(tokenPaciente));
    expect(res.status).toBe(404);
  });

  it('retorna os dados quando o nutricionista existe', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dra. Rota', cpf: '22233344400', email: 'dra.rota@teste.com', telefone: '81900000010', senha: 'hash' },
    });

    const res = await request(app)
      .get(`/api/nutricionistas/${nutri.id}`)
      .set('Authorization', bearer(tokenPaciente));

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(nutri.id);
  });
});

describe('PUT /api/nutricionistas/:id', () => {
  it('sem token → 401', async () => {
    const res = await request(app).put('/api/nutricionistas/1').send({ nome: 'X' });
    expect(res.status).toBe(401);
  });

  it('paciente não autorizado → 403', async () => {
    const res = await request(app)
      .put('/api/nutricionistas/1')
      .set('Authorization', bearer(tokenPaciente))
      .send({ nome: 'X' });
    expect(res.status).toBe(403);
  });

  it('nutricionista atualiza com sucesso', async () => {
    const nutri = await prisma.nutricionista.create({
      data: { nome: 'Dra. Antes', cpf: '22233344401', email: 'dra.antes@teste.com', telefone: '81900000011', senha: 'hash' },
    });

    const res = await request(app)
      .put(`/api/nutricionistas/${nutri.id}`)
      .set('Authorization', bearer(tokenNutri))
      .send({ nome: 'Dra. Depois' });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Dra. Depois');
  });
});

describe('POST /api/auth/social-login', () => {
  it('cria/loga um paciente via social login e retorna token', async () => {
    const res = await request(app)
      .post('/api/auth/social-login')
      .send({ nome: 'Social Route', email: 'social.route@teste.com' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejeita social login sem email com 400', async () => {
    const res = await request(app)
      .post('/api/auth/social-login')
      .send({ nome: 'Sem Email' });

    expect(res.status).toBe(400);
  });
});

describe('Validação em /api/auth', () => {
  it('register rejeita corpo inválido com 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nome: 'A' });

    expect(res.status).toBe(400);
  });

  it('login rejeita corpo sem senha com 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'qualquer@teste.com' });

    expect(res.status).toBe(400);
  });
});
