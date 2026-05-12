-- Migration inicial: cria as três tabelas principais do sistema de uma vez só
-- Em SQL, comentários de linha única usam dois traços (--)

-- ============================================================
-- Tabela: paciente
-- Guarda os dados dos pacientes cadastrados na plataforma
-- ============================================================
CREATE TABLE IF NOT EXISTS paciente (
  -- SERIAL gera um número inteiro único e crescente automaticamente (1, 2, 3...)
  -- PRIMARY KEY garante que esse campo identifica cada linha de forma única
  id SERIAL PRIMARY KEY,

  -- VARCHAR(255) armazena texto com no máximo 255 caracteres
  -- NOT NULL significa que esse campo é obrigatório — não pode ficar vazio
  nome VARCHAR(255) NOT NULL,

  -- UNIQUE impede que dois pacientes se cadastrem com o mesmo email
  email VARCHAR(255) UNIQUE NOT NULL,

  -- Guardamos o hash da senha, nunca a senha em texto puro
  senha VARCHAR(255) NOT NULL,

  -- JSONB é um tipo do PostgreSQL para armazenar dados em formato JSON
  -- Usado aqui para guardar informações variáveis (altura, peso, alergias, etc.)
  -- Não tem NOT NULL porque pode ser preenchido depois
  dados_pessoais JSONB,

  -- TIMESTAMP armazena data e hora
  -- DEFAULT NOW() preenche automaticamente com o momento do cadastro
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- Tabela: nutricionista
-- Guarda os dados dos nutricionistas que usam o sistema
-- ============================================================
CREATE TABLE IF NOT EXISTS nutricionista (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- Tabela: plano_alimentar
-- Liga um paciente ao seu nutricionista e guarda o plano de alimentação
-- ============================================================
CREATE TABLE IF NOT EXISTS plano_alimentar (
  id SERIAL PRIMARY KEY,

  -- REFERENCES paciente(id) cria uma chave estrangeira: esse campo só aceita
  -- valores de IDs que existam na tabela paciente
  -- ON DELETE CASCADE: se o paciente for deletado, seus planos também são removidos
  paciente_id INTEGER REFERENCES paciente(id) ON DELETE CASCADE,

  -- ON DELETE SET NULL: se o nutricionista for deletado, o campo vira NULL
  -- (o plano continua existindo, mas sem vínculo com o nutricionista)
  nutricionista_id INTEGER REFERENCES nutricionista(id) ON DELETE SET NULL,

  -- TEXT armazena texto de tamanho ilimitado — ideal para descrições longas
  descricao TEXT,

  -- Status padrão é 'ativo' — pode mudar para 'concluido', 'cancelado', etc.
  status VARCHAR(50) DEFAULT 'ativo',

  created_at TIMESTAMP DEFAULT NOW()
);
