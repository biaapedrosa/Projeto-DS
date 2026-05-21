/**
 * ETAPA 1 — Extract Constant
 * Técnica: "Replace Magic Number with Symbolic Constant" (Burchard cap. 3)
 *
 * SMELL resolvido: Magic Numbers
 *
 * ANTES:  res.status(404).json(...)
 *         res.status(200).json(...)
 *         → o número não comunica nada por si só
 *
 * DEPOIS: res.status(HTTP.NOT_FOUND).json(...)
 *         res.status(HTTP.OK).json(...)
 *         → o nome da constante documenta a INTENÇÃO
 *
 * Benefício adicional: se o padrão mudar (ex: 200 → 202 para operações async),
 * você muda em 1 lugar, não em 9.
 */

// ── Constante nova ────────────────────────────────────────────────────────────
const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// ── DB (inalterado) ───────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// PACIENTE CONTROLLERS  (smells 2, 3, 4, 5 ainda presentes)
// ─────────────────────────────────────────────────────────────────────────────

const getAllPacientes = async (req, res) => {
  try {
    res.status(HTTP.OK).json(db.pacientes);              // ✓ sem magic number
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({ error: err.message });
  }
};

const getPacienteById = async (req, res) => {
  try {
    const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
    if (!paciente) throw new Error('Paciente não encontrado!');
    res.status(HTTP.OK).json(paciente);                  // ✓
  } catch (err) {
    res.status(HTTP.NOT_FOUND).json({ error: err.message });
  }
};

const updatePaciente = async (req, res) => {
  try {
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new Error('Paciente não encontrado!');
    db.pacientes[idx] = { ...db.pacientes[idx], ...req.body };
    res.status(HTTP.OK).json(db.pacientes[idx]);         // ✓
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({ error: err.message }); // SMELL 4 ainda presente
  }
};

const removePaciente = async (req, res) => {
  try {
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new Error('Paciente não encontrado!');
    db.pacientes.splice(idx, 1);
    res.status(HTTP.NO_CONTENT).send();                  // ✓
  } catch (err) {
    res.status(HTTP.NOT_FOUND).json({ error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

const getAllNoticias = async (req, res) => {
  try {
    res.status(HTTP.OK).json(db.noticias);               // ✓
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({ error: err.message });
  }
};

const getNoticiaById = async (req, res) => {
  try {
    const noticia = db.noticias.find(n => n.id === Number(req.params.id));
    if (!noticia) throw new Error('Notícia não encontrada!');
    res.status(HTTP.OK).json(noticia);                   // ✓
  } catch (err) {
    res.status(HTTP.NOT_FOUND).json({ error: err.message });
  }
};

const createNoticia = async (req, res) => {
  try {
    const noticia = { id: db.noticias.length + 1, ...req.body };
    db.noticias.push(noticia);
    res.status(HTTP.CREATED).json(noticia);              // ✓
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({ error: err.message });
  }
};

const updateNoticia = async (req, res) => {
  try {
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new Error('Notícia não encontrada!');
    db.noticias[idx] = { ...db.noticias[idx], ...req.body };
    res.status(HTTP.OK).json(db.noticias[idx]);          // ✓
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({ error: err.message }); // SMELL 4 ainda presente
  }
};

const removeNoticia = async (req, res) => {
  try {
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new Error('Notícia não encontrada!');
    db.noticias.splice(idx, 1);
    res.status(HTTP.NO_CONTENT).send();                  // ✓
  } catch (err) {
    res.status(HTTP.NOT_FOUND).json({ error: err.message });
  }
};

module.exports = {
  HTTP,
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
