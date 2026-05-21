// Etapa 3 do refactoring real: Extract Function — asyncHandler
// Resolve: Duplicated Code (try/catch repetido em todos os controllers)

const HTTP_STATUS = require('../constants/httpStatus');

/**
 * Wrapper que elimina o boilerplate try/catch nos controllers.
 * Mapeia err.statusCode para a resposta HTTP automaticamente.
 * @param {Function} fn - handler async (req, res)
 * @returns {Function} handler com tratamento de erro centralizado
 */
const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

module.exports = asyncHandler;
