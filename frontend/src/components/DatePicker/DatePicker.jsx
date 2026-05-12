// Importa o CSS do componente DatePicker para estilização
import './DatePicker.css';

// Componente reutilizável de seleção de data
// Props:
//   label   — texto da etiqueta exibida acima do campo (opcional)
//   value   — data selecionada atualmente (controlado pelo componente pai)
//   onChange — função chamada quando o usuário seleciona uma nova data
//   min     — data mínima permitida (ex: '2024-01-01')
//   max     — data máxima permitida (ex: '2024-12-31')
const DatePicker = ({ label, value, onChange, min, max }) => {

  return (
    <div className="datepicker-container">

      {/* Exibe o label somente se a prop foi fornecida */}
      {label && <label className="datepicker-label">{label}</label>}

      <div className="datepicker-input-wrapper">
        {/* Ícone de calendário — SVG inline */}
        <svg className="datepicker-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2"/>
          <path d="M3 9h18" stroke="#6b7280" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Input do tipo date — abre o seletor nativo de data do browser */}
        {/* Repassa o valor selecionado para o componente pai via onChange */}
        <input
          type="date"
          className="datepicker-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
        />
      </div>

    </div>
  );
};

export default DatePicker;
