/**
 * ETAPA 5 — Extract Function: createCrudController (Factory)
 * Técnica: "Replace Duplicate Code with Factory" (Burchard cap. 8)
 *
 * SMELL resolvido: Code Clone — paciente handlers ≅ noticia handlers (~80 linhas duplicadas)
 *
 * ANTES:  dois grupos de handlers quase idênticos
 *         toda feature nova precisava ser implementada duas vezes
 *
 * DEPOIS: 1 factory que gera os handlers para qualquer recurso
 *         handlers específicos sobrescrevem apenas o que precisa ser diferente
 *
 * RESULTADO FINAL:
 *   - De ~130 linhas de handlers para ~20 linhas
 *   - Zero duplicação entre paciente e noticia
 *   - Adicionar um novo recurso (ex: nutricionistas) = 3 linhas
 */

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(message) { super(message, HTTP.NOT_FOUND); }
}

class ValidationError extends AppError {
  constructor(message) { super(message, HTTP.BAD_REQUEST); }
}

const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.statusCode || HTTP.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

const findOrFail = (collection, id, message) => {
  const item = collection.find(x => x.id === Number(id));
  if (!item) throw new NotFoundError(message);
  return item;
};

const findWithIndexOrFail = (collection, id, message) => {
  const idx = collection.findIndex(x => x.id === Number(id));
  if (idx === -1) throw new NotFoundError(message);
  return [collection[idx], idx];
};

// ── createCrudController: a factory ──────────────────────────────────────────

/**
 * Gera handlers CRUD padronizados para qualquer coleção.
 *
 * @param {object} options
 * @param {Function} options.getCollection  - getter que retorna o array atual
 * @param {string}  options.notFoundMessage - mensagem para NotFoundError
 * @param {Function} [options.buildItem]    - como criar um novo item (opcional, para POST)
 * @returns {{ getAll, getById, create, update, remove }}
 */
const createCrudController = ({ getCollection, notFoundMessage, buildItem }) => ({
  getAll: asyncHandler(async (req, res) => {
    res.status(HTTP.OK).json(getCollection());
  }),

  getById: asyncHandler(async (req, res) => {
    const item = findOrFail(getCollection(), req.params.id, notFoundMessage);
    res.status(HTTP.OK).json(item);
  }),

  create: asyncHandler(async (req, res) => {
    const collection = getCollection();
    const item = buildItem
      ? buildItem(req.body, collection)
      : { id: collection.length + 1, ...req.body };
    collection.push(item);
    res.status(HTTP.CREATED).json(item);
  }),

  update: asyncHandler(async (req, res) => {
    const collection = getCollection();
    const [, idx] = findWithIndexOrFail(collection, req.params.id, notFoundMessage);
    collection[idx] = { ...collection[idx], ...req.body };
    res.status(HTTP.OK).json(collection[idx]);
  }),

  remove: asyncHandler(async (req, res) => {
    const collection = getCollection();
    const [, idx] = findWithIndexOrFail(collection, req.params.id, notFoundMessage);
    collection.splice(idx, 1);
    res.status(HTTP.NO_CONTENT).send();
  }),
});

// ── DB ────────────────────────────────────────────────────────────────────────
const INITIAL_DATA = () => ({
  pacientes: [
    { id: 1, nome: 'João Silva',   email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com' },
  ],
  noticias: [
    { id: 1, titulo: 'Dieta mediterrânea', conteudo: 'Benefícios da dieta.' },
  ],
});

let db = INITIAL_DATA();
const _resetDb = () => { db = INITIAL_DATA(); };

// ── Controllers gerados pela factory ─────────────────────────────────────────

const pacienteController = createCrudController({
  getCollection:    () => db.pacientes,
  notFoundMessage: 'Paciente não encontrado!',
});

const noticiaController = createCrudController({
  getCollection:    () => db.noticias,
  notFoundMessage: 'Notícia não encontrada!',
});

// Exporta com os mesmos nomes da etapa anterior para manter compatibilidade
const { getAll: getAllPacientes, getById: getPacienteById,
        update: updatePaciente, remove: removePaciente } = pacienteController;

const { getAll: getAllNoticias, getById: getNoticiaById,
        create: createNoticia, update: updateNoticia, remove: removeNoticia } = noticiaController;

module.exports = {
  HTTP, AppError, NotFoundError, ValidationError,
  asyncHandler, findOrFail, findWithIndexOrFail, createCrudController,
  pacienteController, noticiaController,
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
