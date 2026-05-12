-- Migration: cria a tabela de nutricionistas
-- Essa tabela guarda os dados de acesso e identificação de cada nutricionista

-- IF NOT EXISTS evita erro caso a tabela já exista no banco
-- (útil quando a migration é executada mais de uma vez por acidente)
CREATE TABLE IF NOT EXISTS nutricionista (
  -- id gerado automaticamente pelo banco — nunca precisamos informar esse valor ao inserir
  id SERIAL PRIMARY KEY,

  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, -- UNIQUE impede emails duplicados
  senha VARCHAR(255) NOT NULL,        -- sempre armazenado como hash (bcrypt)

  -- Preenchido automaticamente com a data/hora do cadastro
  created_at TIMESTAMP DEFAULT NOW()
);
