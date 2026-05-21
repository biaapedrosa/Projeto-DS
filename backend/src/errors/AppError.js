// Etapa 2 do refactoring real: Introduce Exception Hierarchy
// Resolve: Primitive Obsession + Inconsistent Error Handling

const HTTP_STATUS = require('../constants/httpStatus');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

module.exports = { AppError, NotFoundError, ValidationError };
