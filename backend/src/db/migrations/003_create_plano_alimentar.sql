-- Migration: cria a tabela de planos alimentares
-- Essa é a tabela central do sistema — relaciona paciente e nutricionista

CREATE TABLE IF NOT EXISTS plano_alimentar (
  id SERIAL PRIMARY KEY,

  -- Chave estrangeira obrigatória: todo plano precisa estar vinculado a um paciente existente
  -- NOT NULL garante que não há plano sem dono
  -- REFERENCES paciente(id) significa: esse valor deve existir na coluna id da tabela paciente
  paciente_id INTEGER NOT NULL REFERENCES paciente(id),

  -- Chave estrangeira obrigatória para o nutricionista responsável pelo plano
  nutricionista_id INTEGER NOT NULL REFERENCES nutricionista(id),

  -- TEXT permite descrições longas sem limite de caracteres
  descricao TEXT NOT NULL,

  -- data_criacao é preenchida automaticamente com NOW() (data e hora atual do servidor)
  data_criacao TIMESTAMP DEFAULT NOW(),

  -- Status começa como 'ativo' — pode ser atualizado para 'concluido', 'pausado', etc.
  status VARCHAR(50) DEFAULT 'ativo'
);
