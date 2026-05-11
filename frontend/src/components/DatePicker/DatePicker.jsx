import './DatePicker.css';

// Componente reutilizável de seleção de data
// Recebe label, value, onChange e opcionalmente min/max para limitar datas
const DatePicker = ({ label, value, onChange, min, max }) => {

  return (
    <div className="datepicker-container">

      {/* Label opcional acima do campo */}
      {label && <label className="datepicker-label">{label}</label>}

      <div className="datepicker-input-wrapper">
        {/* Ícone de calendário */}
        <svg className="datepicker-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2"/>
          <path d="M3 9h18" stroke="#6b7280" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <input
          type="date"
          className="datepicker-input"
          value={value}
          onChange={(e) => onChange(e.target.value)} // Repassa o valor para o componente pai
          min={min}
          max={max}
        />
      </div>

    </div>
  );
};

export default DatePicker;