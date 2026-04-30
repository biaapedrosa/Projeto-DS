CREATE TABLE IF NOT EXISTS plano_alimentar (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER NOT NULL REFERENCES paciente(id),
  nutricionista_id INTEGER NOT NULL REFERENCES nutricionista(id),
  descricao TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'ativo'
);