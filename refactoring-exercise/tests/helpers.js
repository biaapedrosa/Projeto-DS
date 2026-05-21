// Utilitários compartilhados pelos testes de todas as etapas

/**
 * Cria um objeto res falso com jest.fn() para testar controllers
 * sem precisar de um servidor Express real.
 */
const makeRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json:   jest.fn().mockReturnThis(),
    send:   jest.fn().mockReturnThis(),
  };
  return res;
};

/**
 * Cria um objeto req falso com params e body.
 */
const makeReq = (params = {}, body = {}) => ({ params, body });

module.exports = { makeRes, makeReq };
