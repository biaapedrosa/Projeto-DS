CREATE TABLE IF NOT EXISTS alimento (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(500) NOT NULL,
  energia_kcal NUMERIC(10,2),
  energia_kj NUMERIC(10,2),
  proteina_g NUMERIC(10,2),
  lipideos_g NUMERIC(10,2),
  carboidratos_g NUMERIC(10,2),
  calcio_mg NUMERIC(10,2),
  ferro_mg NUMERIC(10,2),
  retinol_mcg NUMERIC(10,2),
  vitamina_c_mg NUMERIC(10,2),
  sodio_mg NUMERIC(10,2),
  restricoes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);