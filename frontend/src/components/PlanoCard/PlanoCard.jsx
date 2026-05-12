// PlanoCard exibe as informações de um plano alimentar em formato de cartão
// Props:
//   plano — objeto com os dados do plano (id, status, descricao, data_criacao)
//   tipo  — 'atual' ou 'antigo', controla a aparência visual do card
const PlanoCard = ({ plano, tipo = 'atual' }) => {
  // Define se é o plano atual para usar nas condicionais de estilo abaixo
  const isAtual = tipo === 'atual';

  // Estilo do container: borda e fundo mais destacados para o plano atual
  const containerStyle = {
    border: isAtual ? '2px solid #2d6a4f' : '1px solid #ccc',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    backgroundColor: isAtual ? '#f0fdf4' : '#f9f9f9',
    opacity: isAtual ? 1 : 0.75, // planos antigos aparecem levemente transparentes
  };

  // Estilo do badge (etiqueta colorida): verde para atual, cinza para antigo
  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: isAtual ? '#2d6a4f' : '#999',
    color: '#fff',
    marginBottom: '12px',
  };

  // Estilo do botão "Ver detalhes" — só aparece no plano atual
  const buttonStyle = {
    marginTop: '12px',
    padding: '8px 16px',
    backgroundColor: '#2d6a4f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      {/* Badge que identifica se é o plano atual ou um plano anterior */}
      <span style={badgeStyle}>
        {isAtual ? '✅ Plano Atual' : '📋 Plano Anterior'}
      </span>

      <h3 style={{ margin: '0 0 8px' }}>Plano #{plano.id}</h3>
      <p><strong>Status:</strong> {plano.status}</p>
      <p><strong>Descrição:</strong> {plano.descricao}</p>

      {/* Formata a data para o padrão brasileiro (dd/mm/aaaa)
          Tenta data_criacao primeiro; se não existir, usa created_at */}
      <p><strong>Data de criação:</strong> {new Date(plano.data_criacao || plano.created_at).toLocaleDateString('pt-BR')}</p>

      {/* Botão de detalhes — exibido apenas no plano atual */}
      {isAtual && (
        <button style={buttonStyle}>Ver detalhes</button>
      )}
    </div>
  );
};

export default PlanoCard;
