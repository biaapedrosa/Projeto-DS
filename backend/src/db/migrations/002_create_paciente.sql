-- Migration: cria a tabela de pacientes
-- Cada paciente tem dados de acesso (email/senha) e dados pessoais em formato JSON

CREATE TABLE IF NOT EXISTS paciente (
  -- id é a chave primária — identifica cada paciente de forma única
  id SERIAL PRIMARY KEY,

  nome VARCHAR(255) NOT NULL,

  -- UNIQUE: não permite dois pacientes com o mesmo email
  email VARCHAR(255) UNIQUE NOT NULL,

  -- Senha armazenada como hash bcrypt — nunca em texto puro
  senha VARCHAR(255) NOT NULL,

  -- JSONB permite guardar um objeto JSON diretamente no campo
  -- Ex: { "altura": 1.70, "peso": 65, "alergias": ["lactose"] }
  -- A vantagem do JSONB sobre TEXT é que o PostgreSQL consegue indexar e consultar os campos internos
  dados_pessoais JSONB,

  -- Data de cadastro preenchida automaticamente
  created_at TIMESTAMP DEFAULT NOW()
);
