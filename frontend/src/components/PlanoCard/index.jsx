import { CheckCircle2, ClipboardList } from 'lucide-react';

const PlanoCard = ({ plano, tipo = 'atual' }) => {
  const isAtual = tipo === 'atual';

  const containerClass = isAtual
    ? 'mb-4 rounded-xl border-2 border-nutri bg-[#f0fdf4] p-5'
    : 'mb-4 rounded-xl border border-[#ccc] bg-[#f9f9f9] p-5 opacity-75';

  const badgeClass = `mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white ${
    isAtual ? 'bg-nutri' : 'bg-[#999]'
  }`;

  return (
    <div className={containerClass}>
      <span className={badgeClass}>
        {isAtual ? <CheckCircle2 size={14} /> : <ClipboardList size={14} />}
        {isAtual ? 'Plano Atual' : 'Plano Anterior'}
      </span>
      <h3 className="mb-2 mt-0">Plano #{plano.id}</h3>
      <p><strong>Status:</strong> {plano.status}</p>
      <p><strong>Descrição:</strong> {plano.descricao}</p>
      <p><strong>Data de criação:</strong> {new Date(plano.data_criacao || plano.created_at).toLocaleDateString('pt-BR')}</p>
      {isAtual && (
        <button className="mt-3 cursor-pointer rounded-lg border-0 bg-nutri px-4 py-2 text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
          Ver detalhes
        </button>
      )}
    </div>
  );
};

export default PlanoCard;