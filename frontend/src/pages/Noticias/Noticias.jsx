// useState: guarda os estados locais da página (lista de notícias, campos do formulário, mensagens)
// useEffect: executa a busca de notícias quando a página é carregada
import { useState, useEffect } from 'react';

// Importa a instância configurada do axios para chamar a API
import api from '../../services/api';

export default function Noticias() {
  // Estado que guarda a lista de notícias retornada pela API
  const [noticias, setNoticias] = useState([]);

  // Estados dos campos do formulário de publicação de nova notícia
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  // Mensagem de erro exibida em vermelho quando algo dá errado
  const [erro, setErro] = useState('');

  // Mensagem de sucesso exibida em verde após publicar uma notícia
  const [sucesso, setSucesso] = useState('');

  // Função que busca todas as notícias da API e atualiza o estado
  // Separada em função própria para poder ser chamada tanto no useEffect quanto após publicar
  const fetchNoticias = async () => {
    try {
      const response = await api.get('/api/noticias');
      setNoticias(response.data); // atualiza a lista com os dados recebidos
    } catch (err) {
      setErro('Erro ao carregar notícias.');
    }
  };

  // Executa fetchNoticias uma vez quando o componente é montado (array vazio = sem dependências)
  useEffect(() => {
    fetchNoticias();
  }, []);

  // Submete o formulário para criar uma nova notícia
  const handleSubmit = async (e) => {
    e.preventDefault(); // impede o comportamento padrão de recarregar a página
    setErro('');
    setSucesso('');

    // Validação simples no frontend — evita chamada desnecessária à API
    if (!titulo || !conteudo) {
      setErro('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      // Envia os dados para a API (o token JWT é adicionado automaticamente pelo interceptor)
      await api.post('/api/noticias', { titulo, conteudo });
      setSucesso('Notícia publicada com sucesso!');

      // Limpa os campos do formulário após a publicação
      setTitulo('');
      setConteudo('');

      // Recarrega a lista de notícias para incluir a recém-criada
      fetchNoticias();
    } catch (err) {
      setErro('Erro ao publicar notícia.');
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: '24px' }}>Notícias</h2>

      {/* Formulário de publicação — qualquer usuário logado pode publicar */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #2d6a4f', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#2d6a4f' }}>Publicar nova notícia</h3>

        {/* Mensagens de feedback visíveis acima dos campos */}
        {erro && <p style={{ color: 'red', marginBottom: '12px' }}>{erro}</p>}
        {sucesso && <p style={{ color: 'green', marginBottom: '12px' }}>{sucesso}</p>}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // atualiza o estado a cada tecla
            placeholder="Digite o título da notícia"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Conteúdo</label>
          {/* textarea é como um input, mas para textos longos */}
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Digite o conteúdo da notícia"
            rows={5}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{ backgroundColor: '#2d6a4f', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
        >
          Publicar
        </button>
      </div>

      {/* Lista de notícias publicadas */}
      <h3 style={{ color: '#555', marginBottom: '16px' }}>Notícias publicadas</h3>
      {noticias.length === 0 ? (
        <p>Nenhuma notícia encontrada.</p>
      ) : (
        // Mapeia cada notícia para um card visual
        // key={noticia.id} é necessário para o React otimizar a re-renderização da lista
        noticias.map((noticia) => (
          <div key={noticia.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', marginBottom: '16px', backgroundColor: '#fff' }}>
            <h4 style={{ margin: '0 0 8px', color: '#2d6a4f' }}>{noticia.titulo}</h4>
            <p style={{ margin: '0 0 8px', color: '#555' }}>{noticia.conteudo}</p>
            {/* Formata a data para o padrão brasileiro (dd/mm/aaaa) */}
            <small style={{ color: '#999' }}>{new Date(noticia.data_publicacao).toLocaleDateString('pt-BR')}</small>
          </div>
        ))
      )}
    </div>
  );
}
