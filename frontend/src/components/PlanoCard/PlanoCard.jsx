const PlanoCard = ({ plano }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <h3>Plano #{plano.id}</h3>
      <p><strong>Status:</strong> {plano.status}</p>
      <p><strong>Descrição:</strong> {plano.descricao}</p>
      <p><strong>Data de criação:</strong> {new Date(plano.data_criacao).toLocaleDateString('pt-BR')}</p>
    </div>
  );
};

export default PlanoCard;