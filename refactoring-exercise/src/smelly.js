/**
 * CÓDIGO ORIGINAL — VERSÃO "SMELLY"
 * Exercício de Refactoring JavaScript — Evan Burchard
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  SMELL 1 — Magic Numbers                                            │
 * │    Status HTTP (200, 201, 204, 400, 404) espalhados como literais.  │
 * │    Ninguém lembra o que 204 significa sem consultar a documentação. │
 * │                                                                     │
 * │  SMELL 2 — Duplicated Code                                          │
 * │    O bloco try/catch aparece 9 vezes com estrutura quase idêntica.  │
 * │    Se precisar logar o erro, você precisa alterar 9 lugares.        │
 * │                                                                     │
 * │  SMELL 3 — Primitive Obsession                                      │
 * │    Erros lançados como `new Error(string)` genérico, sem tipo.      │
 * │    O controller não sabe se o erro é "not found" ou "validation".   │
 * │                                                                     │
 * │  SMELL 4 — Inconsistent Error Handling                              │
 * │    updatePaciente/updateNoticia lançam 400 para "não encontrado",   │
 * │    mas getById lança 404 para o mesmo caso. Comportamento incoerente│
 * │                                                                     │
 * │  SMELL 5 — Code Clone                                               │
 * │    Os handlers de paciente e noticia são cópias um do outro.        │
 * │    Toda nova feature precisa ser implementada duas vezes.           │
 * └─────────────────────────────────────────────────────────────────────┘
 */

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
// PACIENTE CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

const getAllPacientes = async (req, res) => {
  try {                                                         // SMELL 2
    res.status(200).json(db.pacientes);                         // SMELL 1
  } catch (err) {
    res.status(400).json({ error: err.message });               // SMELL 1
  }
};

const getPacienteById = async (req, res) => {
  try {                                                         // SMELL 2
    const paciente = db.pacientes.find(p => p.id === Number(req.params.id));
    if (!paciente) throw new Error('Paciente não encontrado!'); // SMELL 3
    res.status(200).json(paciente);                             // SMELL 1
  } catch (err) {
    res.status(404).json({ error: err.message });               // SMELL 1
  }
};

const updatePaciente = async (req, res) => {
  try {                                                         // SMELL 2
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new Error('Paciente não encontrado!');// SMELL 3
    db.pacientes[idx] = { ...db.pacientes[idx], ...req.body };
    res.status(200).json(db.pacientes[idx]);                    // SMELL 1
  } catch (err) {
    res.status(400).json({ error: err.message });               // SMELL 4: deveria ser 404!
  }
};

const removePaciente = async (req, res) => {
  try {                                                         // SMELL 2
    const idx = db.pacientes.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) throw new Error('Paciente não encontrado!');// SMELL 3
    db.pacientes.splice(idx, 1);
    res.status(204).send();                                     // SMELL 1
  } catch (err) {
    res.status(404).json({ error: err.message });               // SMELL 1
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// NOTICIA CONTROLLERS  ← SMELL 5: quasi-cópia dos handlers acima
// ─────────────────────────────────────────────────────────────────────────────

const getAllNoticias = async (req, res) => {
  try {                                                         // SMELL 2
    res.status(200).json(db.noticias);                          // SMELL 1
  } catch (err) {
    res.status(400).json({ error: err.message });               // SMELL 1
  }
};

const getNoticiaById = async (req, res) => {
  try {                                                         // SMELL 2
    const noticia = db.noticias.find(n => n.id === Number(req.params.id));
    if (!noticia) throw new Error('Notícia não encontrada!');   // SMELL 3
    res.status(200).json(noticia);                              // SMELL 1
  } catch (err) {
    res.status(404).json({ error: err.message });               // SMELL 1
  }
};

const createNoticia = async (req, res) => {
  try {                                                         // SMELL 2
    const noticia = { id: db.noticias.length + 1, ...req.body };
    db.noticias.push(noticia);
    res.status(201).json(noticia);                              // SMELL 1
  } catch (err) {
    res.status(400).json({ error: err.message });               // SMELL 1
  }
};

const updateNoticia = async (req, res) => {
  try {                                                         // SMELL 2
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new Error('Notícia não encontrada!'); // SMELL 3
    db.noticias[idx] = { ...db.noticias[idx], ...req.body };
    res.status(200).json(db.noticias[idx]);                     // SMELL 1
  } catch (err) {
    res.status(400).json({ error: err.message });               // SMELL 4: deveria ser 404!
  }
};

const removeNoticia = async (req, res) => {
  try {                                                         // SMELL 2
    const idx = db.noticias.findIndex(n => n.id === Number(req.params.id));
    if (idx === -1) throw new Error('Notícia não encontrada!'); // SMELL 3
    db.noticias.splice(idx, 1);
    res.status(204).send();                                     // SMELL 1
  } catch (err) {
    res.status(404).json({ error: err.message });               // SMELL 1
  }
};

module.exports = {
  getAllPacientes, getPacienteById, updatePaciente, removePaciente,
  getAllNoticias, getNoticiaById, createNoticia, updateNoticia, removeNoticia,
  _resetDb,
};
