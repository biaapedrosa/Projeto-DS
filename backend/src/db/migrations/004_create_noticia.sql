-- Migration: cria a tabela de notícias
-- Notícias são publicadas pelos nutricionistas e visíveis a todos os usuários (inclusive não logados)

CREATE TABLE IF NOT EXISTS noticia (
  -- Identificador único gerado automaticamente pelo banco
  id SERIAL PRIMARY KEY,

  -- Título curto da notícia — limitado a 255 caracteres
  titulo VARCHAR(255) NOT NULL,

  -- Conteúdo completo da notícia — TEXT não tem limite de tamanho
  conteudo TEXT NOT NULL,

  -- Data e hora da publicação — preenchida automaticamente com NOW() ao inserir
  -- Usada para ordenar as notícias da mais recente para a mais antiga
  data_publicacao TIMESTAMP DEFAULT NOW()
);
