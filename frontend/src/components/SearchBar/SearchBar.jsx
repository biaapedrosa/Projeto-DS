// Importa o CSS do componente SearchBar para estilização
import './SearchBar.css';

// Componente reutilizável de busca — recebe placeholder e função onSearch como props
// placeholder: texto de dica exibido quando o campo está vazio (padrão: 'Pesquisar...')
// onSearch: função callback chamada a cada vez que o usuário digita — o componente pai recebe o texto
const SearchBar = ({ placeholder = 'Pesquisar...', onSearch }) => {

  // Chamado a cada tecla pressionada — repassa o valor digitado para o componente pai
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="searchbar-container">
      {/* Ícone de lupa — SVG inline para não depender de biblioteca de ícones */}
      <svg className="searchbar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2"/>
        <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Campo de texto controlado pelo evento onChange */}
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
