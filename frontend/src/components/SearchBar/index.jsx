// Componente reutilizável de busca — recebe placeholder e função onSearch
const SearchBar = ({ placeholder = 'Pesquisar...', onSearch }) => {

  const handleChange = (e) => {
    onSearch(e.target.value); // Chama a função passada pelo componente pai a cada digitação
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-[0.55rem] transition-all focus-within:border-nutri-light focus-within:shadow-[0_0_0_3px_rgba(76,175,125,0.15)]">
      <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2"/>
        <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        className="w-full border-0 bg-transparent text-[0.95rem] text-[#1a3a2a] outline-none placeholder:text-[#9ca3af]"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;