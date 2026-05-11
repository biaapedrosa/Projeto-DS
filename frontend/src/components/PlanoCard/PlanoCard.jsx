const PlanoCard = ({ plano, tipo = 'atual' }) => {
  const isAtual = tipo === 'atual';

  const containerStyle = {
    border: isAtual ? '2px solid #2d6a4f' : '1px solid #ccc',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    backgroundColor: isAtual ? '#f0fdf4' : '#f9f9f9',
    opacity: isAtual ? 1 : 0.75,
  };

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
      <span style={badgeStyle}>
        {isAtual ? '✅ Plano Atual' : '📋 Plano Anterior'}
      </span>
      <h3 style={{ margin: '0 0 8px' }}>Plano #{plano.id}</h3>
      <p><strong>Status:</strong> {plano.status}</p>
      <p><strong>Descrição:</strong> {plano.descricao}</p>
      <p><strong>Data de criação:</strong> {new Date(plano.data_criacao || plano.created_at).toLocaleDateString('pt-BR')}</p>
      {isAtual && (
        <button style={buttonStyle}>Ver detalhes</button>
      )}
    </div>
  );
};

export default PlanoCard;