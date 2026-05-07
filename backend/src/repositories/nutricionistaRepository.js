const db = require('../db');

const findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM nutricionistas WHERE email = $1', [email]);
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await db.query(
    'SELECT id, nome, email FROM nutricionistas WHERE id = $1',
    [id]
  );
  return rows[0];
};

module.exports = { findByEmail, findById };
