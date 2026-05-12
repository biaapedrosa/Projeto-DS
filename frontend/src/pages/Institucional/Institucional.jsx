// useState: guarda os valores retornados pelos componentes de busca e data
import { useState } from 'react';

// Importa os componentes reutilizáveis de busca e seleção de data
import SearchBar from '../../components/SearchBar/SearchBar';
import DatePicker from '../../components/DatePicker/DatePicker';

// Página Institucional — atualmente usada como vitrine dos componentes criados no projeto
// Serve para testar visualmente o SearchBar e o DatePicker antes de integrá-los em outras páginas
export default function Institucional() {
  // Guarda o texto que o usuário digitou no campo de busca
  const [busca, setBusca] = useState('');

  // Guarda a data selecionada pelo DatePicker
  const [data, setData] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#1a3a2a' }}>Teste de Componentes</h1>

      <h3 style={{ marginBottom: '0.5rem' }}>SearchBar:</h3>
      {/* onSearch é uma prop de callback — quando o usuário digita, o SearchBar chama essa função
          passando o texto atual, que atualizamos no estado "busca" */}
      <SearchBar
        placeholder="Buscar paciente..."
        onSearch={(texto) => setBusca(texto)}
      />
      {/* Só exibe o texto buscado se o usuário já digitou algo */}
      {busca && <p style={{ marginTop: '0.5rem', color: '#4CAF7D' }}>Buscando por: <strong>{busca}</strong></p>}

      <h3 style={{ margin: '2rem 0 0.5rem' }}>DatePicker:</h3>
      {/* onChange é chamado com a nova data toda vez que o usuário muda a seleção */}
      <DatePicker
        label="Data de início do plano"
        value={data}
        onChange={(novaData) => setData(novaData)}
      />
      {/* Só exibe a data se o usuário já selecionou alguma */}
      {data && <p style={{ marginTop: '0.5rem', color: '#4CAF7D' }}>Data selecionada: <strong>{data}</strong></p>}
    </div>
  );
}
