import { ModelDef } from '@/data/model';
import { SmileKey } from './Icons';

interface Props {
  model: ModelDef;
}

export default function AnalogyCard({ model }: Props) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="shrink-0 animate-float pt-1">
          <SmileKey size={40} />
        </div>
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-xl">{model.emoji}</span>
            <h3 className="text-base font-bold font-display text-amber-900">
              Real-life analogy: {model.label}
            </h3>
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-white">
              {model.title}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-amber-800 sm:text-[15px]">{model.analogy}</p>
          <p className="mt-2 text-xs font-semibold text-amber-600/80">
            {model.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
