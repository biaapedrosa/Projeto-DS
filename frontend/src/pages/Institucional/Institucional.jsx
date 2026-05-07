import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import DatePicker from '../../components/DatePicker/DatePicker';

export default function Institucional() {
  const [busca, setBusca] = useState('');
  const [data, setData] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#1a3a2a' }}>Teste de Componentes</h1>

      <h3 style={{ marginBottom: '0.5rem' }}>SearchBar:</h3>
      <SearchBar
        placeholder="Buscar paciente..."
        onSearch={(texto) => setBusca(texto)}
      />
      {busca && <p style={{ marginTop: '0.5rem', color: '#4CAF7D' }}>Buscando por: <strong>{busca}</strong></p>}

      <h3 style={{ margin: '2rem 0 0.5rem' }}>DatePicker:</h3>
      <DatePicker
        label="Data de início do plano"
        value={data}
        onChange={(novaData) => setData(novaData)}
      />
      {data && <p style={{ marginTop: '0.5rem', color: '#4CAF7D' }}>Data selecionada: <strong>{data}</strong></p>}
    </div>
  );
}