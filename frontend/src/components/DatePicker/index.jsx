// Componente reutilizável de seleção de data
// Recebe label, value, onChange e opcionalmente min/max para limitar datas
const DatePicker = ({ label, value, onChange, min, max }) => {

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label opcional acima do campo */}
      {label && <label className="text-[0.9rem] font-semibold text-[#374151]">{label}</label>}

      <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-[0.55rem] transition-all focus-within:border-nutri-light focus-within:shadow-[0_0_0_3px_rgba(76,175,125,0.15)]">
        {/* Ícone de calendário */}
        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2"/>
          <path d="M3 9h18" stroke="#6b7280" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <input
          type="date"
          className="relative w-full cursor-pointer border-0 bg-transparent text-[0.95rem] text-[#1a3a2a] outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
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