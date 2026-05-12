// Importa o repositório de notícias para acessar o banco de dados
const noticiaRepository = require('../repositories/noticiaRepository');

// Retorna todas as notícias — delega direto ao repositório (sem lógica extra)
const getAll = async () => await noticiaRepository.findAll();

// Busca uma notícia pelo ID e lança erro se não existir
const getById = async (id) => {
  const noticia = await noticiaRepository.findById(id);
  if (!noticia) throw new Error('Notícia não encontrada!');
  return noticia;
};

// Cria uma nova notícia com os dados recebidos (titulo e conteudo)
const create = async (dados) => await noticiaRepository.create(dados);

// Atualiza uma notícia e verifica se ela foi encontrada após a operação
const update = async (id, dados) => {
  const noticia = await noticiaRepository.update(id, dados);
  if (!noticia) throw new Error('Notícia não encontrada!');
  return noticia;
};

// Remove uma notícia do banco, verificando a existência antes para retornar erro adequado
const remove = async (id) => {
  // Verifica se a notícia existe antes de tentar remover
  const noticia = await noticiaRepository.findById(id);
  if (!noticia) throw new Error('Notícia não encontrada!');
  await noticiaRepository.remove(id);
};

// Exporta as funções para o noticiaController
module.exports = { getAll, getById, create, update, remove };
