import { useEffect, useRef, useState } from 'react';
import alimentoTacoService from '../../services/alimentoTacoService';

const inputClass =
  'box-border rounded-md border border-[#e0e0e0] px-3 py-2 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20';

export default function AutocompleteAlimento({ value, onSelect, placeholder = 'Alimento' }) {
  const [termo, setTermo] = useState(value || '');
  const [sugestoes, setSugestoes] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const containerRef = useRef(null);

  // Mantém o input sincronizado caso o valor mude por fora
  useEffect(() => {
    setTermo(value || '');
  }, [value]);

  // Busca com debounce (300ms); só busca com 2+ caracteres (regra do backend)
  useEffect(() => {
    if (!termo || termo.trim().length < 2) {
      setSugestoes([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setCarregando(true);
        const dados = await alimentoTacoService.search(termo.trim());
        setSugestoes(dados);
        setAberto(true);
      } catch (err) {
        setSugestoes([]);
      } finally {
        setCarregando(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [termo]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickFora = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const handleSelecionar = (alimento) => {
    setTermo(alimento.descricao);
    setAberto(false);
    setSugestoes([]);
    onSelect(alimento); // devolve o objeto completo (id + nutrientes) ao pai
  };

  const handleChange = (e) => {
    const novo = e.target.value;
    setTermo(novo);
    // texto livre continua válido: limpa a referência da TACO se o nutri digitar manualmente
    onSelect({ id: null, descricao: novo });
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <input
        placeholder={placeholder}
        value={termo}
        onChange={handleChange}
        onFocus={() => sugestoes.length > 0 && setAberto(true)}
        className={`${inputClass} w-full`}
        autoComplete="off"
      />
      {aberto && (carregando || sugestoes.length > 0) && (
        <ul className="absolute z-[1100] mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-[#e0e0e0] bg-white shadow-lg">
          {carregando && (
            <li className="px-3 py-2 text-sm text-[#888]">Buscando...</li>
          )}
          {!carregando &&
            sugestoes.map((alimento) => (
              <li
                key={alimento.id}
                onClick={() => handleSelecionar(alimento)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-[#eef4ef]"
              >
                <span className="block">{alimento.descricao}</span>
                {alimento.energia_kcal != null && (
                  <span className="block text-xs text-[#888]">
                    {alimento.energia_kcal} kcal · {alimento.proteina_g ?? 0}g prot · {alimento.carboidratos_g ?? 0}g carb · {alimento.lipideos_g ?? 0}g lip
                  </span>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}