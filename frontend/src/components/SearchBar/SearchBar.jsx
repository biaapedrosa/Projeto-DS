import './SearchBar.css';

// Componente reutilizável de busca — recebe placeholder e função onSearch
const SearchBar = ({ placeholder = 'Pesquisar...', onSearch }) => {

  const handleChange = (e) => {
    onSearch(e.target.value); // Chama a função passada pelo componente pai a cada digitação
  };

  return (
    <div className="searchbar-container">
      <svg className="searchbar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2"/>
        <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
      </svg>
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