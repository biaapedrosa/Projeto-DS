const { validateRegister, validateLogin, validateSocialLogin } = require('../middlewares/validation');

const mockRes = () => {
  const res = {};
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  return res;
};

describe('validateRegister', () => {
  it('rejeita quando faltam campos obrigatórios', () => {
    const req = { body: {} };
    const res = mockRes();
    const next = vi.fn();

    validateRegister(req, res, next);

    expect(res.statusCode).toBe(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejeita email inválido', () => {
    const req = { body: { nome: 'Maria', email: 'invalido', senha: '123456' } };
    const res = mockRes();
    const next = vi.fn();

    validateRegister(req, res, next);

    expect(res.statusCode).toBe(400);
  });

  it('rejeita senha curta', () => {
    const req = { body: { nome: 'Maria', email: 'maria@teste.com', senha: '123' } };
    const res = mockRes();
    const next = vi.fn();

    validateRegister(req, res, next);

    expect(res.statusCode).toBe(400);
  });

  it('chama next quando os dados são válidos', () => {
    const req = { body: { nome: 'Maria', email: 'maria@teste.com', senha: '123456' } };
    const res = mockRes();
    const next = vi.fn();

    validateRegister(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.statusCode).toBeUndefined();
  });
});

describe('validateLogin', () => {
  it('rejeita quando faltam email ou senha', () => {
    const req = { body: { email: 'maria@teste.com' } };
    const res = mockRes();
    const next = vi.fn();

    validateLogin(req, res, next);

    expect(res.statusCode).toBe(400);
  });

  it('chama next quando email e senha estão presentes', () => {
    const req = { body: { email: 'maria@teste.com', senha: '123456' } };
    const res = mockRes();
    const next = vi.fn();

    validateLogin(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });
});

describe('validateSocialLogin', () => {
  it('rejeita quando o email está ausente ou inválido', () => {
    const req = { body: {} };
    const res = mockRes();
    const next = vi.fn();

    validateSocialLogin(req, res, next);

    expect(res.statusCode).toBe(400);
  });

  it('chama next quando o email é válido', () => {
    const req = { body: { email: 'maria@teste.com' } };
    const res = mockRes();
    const next = vi.fn();

    validateSocialLogin(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });
});
