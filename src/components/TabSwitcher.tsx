import { MODELS, ModelId } from '@/data/model';

interface Props {
  active: ModelId;
  onSelect: (id: ModelId) => void;
}

const tabColors: Record<ModelId, { active: string; ring: string }> = {
  onprem: { active: 'bg-amber-400 text-white border-amber-400', ring: 'ring-amber-200' },
  iaas: { active: 'bg-sky-400 text-white border-sky-400', ring: 'ring-sky-200' },
  paas: { active: 'bg-emerald-400 text-white border-emerald-400', ring: 'ring-emerald-200' },
  saas: { active: 'bg-violet-400 text-white border-violet-400', ring: 'ring-violet-200' },
};

export default function TabSwitcher({ active, onSelect }: Props) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {MODELS.map((m) => {
        const isActive = m.id === active;
        const c = tabColors[m.id];
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={[
              'group relative flex items-center gap-2 rounded-2xl border-2 px-3 py-3 text-left transition-all duration-300',
              isActive
                ? `${c.active} shadow-lg scale-[1.03] ring-4 ${c.ring}`
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow-md',
            ].join(' ')}
            aria-pressed={isActive}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{m.emoji}</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold font-display">{m.label}</span>
              <span className={`block text-[11px] font-semibold ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                {m.title}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
