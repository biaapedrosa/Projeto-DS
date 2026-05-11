import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const fetchNoticias = async () => {
    try {
      const response = await api.get('/api/noticias');
      setNoticias(response.data);
    } catch (err) {
      setErro('Erro ao carregar notícias.');
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!titulo || !conteudo) {
      setErro('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      await api.post('/api/noticias', { titulo, conteudo });
      setSucesso('Notícia publicada com sucesso!');
      setTitulo('');
      setConteudo('');
      fetchNoticias();
    } catch (err) {
      setErro('Erro ao publicar notícia.');
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: '24px' }}>Notícias</h2>

      {/* Formulário */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #2d6a4f', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', color: '#2d6a4f' }}>Publicar nova notícia</h3>

        {erro && <p style={{ color: 'red', marginBottom: '12px' }}>{erro}</p>}
        {sucesso && <p style={{ color: 'green', marginBottom: '12px' }}>{sucesso}</p>}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da notícia"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Conteúdo</label>
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

      {/* Lista de notícias */}
      <h3 style={{ color: '#555', marginBottom: '16px' }}>Notícias publicadas</h3>
      {noticias.length === 0 ? (
        <p>Nenhuma notícia encontrada.</p>
      ) : (
        noticias.map((noticia) => (
          <div key={noticia.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', marginBottom: '16px', backgroundColor: '#fff' }}>
            <h4 style={{ margin: '0 0 8px', color: '#2d6a4f' }}>{noticia.titulo}</h4>
            <p style={{ margin: '0 0 8px', color: '#555' }}>{noticia.conteudo}</p>
            <small style={{ color: '#999' }}>{new Date(noticia.data_publicacao).toLocaleDateString('pt-BR')}</small>
          </div>
        ))
      )}
    </div>
  );
}