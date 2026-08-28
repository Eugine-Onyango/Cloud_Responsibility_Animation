import { useEffect, useMemo, useState } from 'react';
import { CloudRainIcon, BoltIcon } from './Icons';
import { LAYERS, ModelDef, ownerOf } from '@/data/model';

interface Props {
  model: ModelDef;
  /** Notify parent when the rain cloud is deployed. */
  onRainChange: (raining: boolean) => void;
  /** Notify parent which layers currently have a shield up. */
  onShieldsChange: (shields: Record<string, boolean>) => void;
}

interface Drop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  /** index of the layer the drop is heading toward */
  targetLayer: number;
}

const RAIN_COUNT = 18;
const RAIN_SECONDS = 6;

export default function RainSimulator({ model, onRainChange, onShieldsChange }: Props) {
  const [raining, setRaining] = useState(false);
  const [shields, setShields] = useState<Record<string, boolean>>({});
  const [splash, setSplash] = useState<Record<string, number>>({});

  // Reset everything when the model changes.
  useEffect(() => {
    setRaining(false);
    setShields({});
    setSplash({});
    onRainChange(false);
    onShieldsChange({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.id]);

  // Auto-clear rain after a while.
  useEffect(() => {
    if (!raining) return;
    const t = setTimeout(() => {
      setRaining(false);
      onRainChange(false);
    }, RAIN_SECONDS * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raining]);

  // Report shield changes up.
  useEffect(() => {
    onShieldsChange(shields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shields]);

  // Count splashes on vendor layers to drive the "deflected" feedback.
  useEffect(() => {
    if (!raining) {
      setSplash({});
      return;
    }
    const iv = setInterval(() => {
      const vendorLayers = LAYERS.filter((l) => ownerOf(model, l.id) === 'vendor');
      if (vendorLayers.length === 0) return;
      const pick = vendorLayers[Math.floor(Math.random() * vendorLayers.length)];
      setSplash((s) => ({ ...s, [pick.id]: (s[pick.id] || 0) + 1 }));
    }, 420);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raining, model.id]);

  const drops = useMemo<Drop[]>(() => {
    if (!raining) return [];
    return Array.from({ length: RAIN_COUNT }, (_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      delay: Math.random() * 1.4,
      duration: 1.2 + Math.random() * 1.1,
      targetLayer: Math.floor(Math.random() * LAYERS.length),
    }));
  }, [raining]);

  const userLayerCount = LAYERS.filter((l) => ownerOf(model, l.id) === 'user').length;
  const unshieldedCount = LAYERS.filter(
    (l) => ownerOf(model, l.id) === 'user' && !shields[l.id]
  ).length;

  function startRain() {
    setShields({});
    setSplash({});
    setRaining(true);
    onRainChange(true);
  }

  function raiseShield(layerId: string) {
    setShields((s) => ({ ...s, [layerId]: true }));
  }

  function shelterAll() {
    const all: Record<string, boolean> = {};
    LAYERS.forEach((l) => {
      if (ownerOf(model, l.id) === 'user') all[l.id] = true;
    });
    setShields(all);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-sky-50 to-white p-4 shadow-inner">
      {/* Rain cloud */}
      <div className="relative mb-3 flex items-center justify-between gap-3">
        <div
          className={[
            'flex items-center gap-2 rounded-2xl px-3 py-2 transition-all duration-500',
            raining ? 'bg-slate-200 text-slate-700 shadow-md animate-cloud' : 'bg-slate-100 text-slate-400',
          ].join(' ')}
        >
          <CloudRainIcon size={28} />
          <span className="text-xs font-bold font-display">
            {raining ? 'Uh oh — it is raining!' : 'Cloud is napping...'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {raining && userLayerCount > 0 && unshieldedCount > 0 && (
            <button
              onClick={shelterAll}
              className="rounded-full border-2 border-emerald-400 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              ☂️ Shelter all
            </button>
          )}
          <button
            onClick={startRain}
            disabled={raining}
            className={[
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold font-display transition-all',
              raining
                ? 'cursor-not-allowed bg-slate-300 text-slate-500'
                : 'bg-amber-400 text-white shadow-md hover:scale-105 hover:bg-amber-500',
            ].join(' ')}
          >
            <BoltIcon size={16} />
            {raining ? 'Raining...' : 'Test My Setup!'}
          </button>
        </div>
      </div>

      {/* Rain drops overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {drops.map((d) => {
          const target = LAYERS[d.targetLayer];
          const isVendorTarget = ownerOf(model, target.id) === 'vendor';
          const shielded = shields[target.id];
          // vendor layers deflect (short fall); user layers fall through unless shielded
          const fall = isVendorTarget || shielded ? 90 : 520;
          return (
            <span
              key={d.id}
              className="animate-rain absolute top-10 text-lg"
              style={{
                left: `${d.left}%`,
                ['--fall' as string]: `${fall}px`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
              }}
            >
              💧
            </span>
          );
        })}
      </div>

      {/* Layer stack with shields */}
      <div className="relative z-10">
        <RainLayers model={model} raining={raining} shields={shields} onRaiseShield={raiseShield} splash={splash} />
      </div>

      {/* Legend / status */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-sky-400" /> Vendor auto-deflects rain
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-dashed border-amber-400" /> You must raise ☂️
        </span>
        {raining && (
          <span className="font-bold text-amber-600">
            {unshieldedCount === 0 ? 'All layers sheltered — nice!' : `${unshieldedCount} layer(s) still exposed`}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---- Internal: layer rendering inside the rain simulator ---- */
function RainLayers({
  model,
  raining,
  shields,
  onRaiseShield,
  splash,
}: {
  model: ModelDef;
  raining: boolean;
  shields: Record<string, boolean>;
  onRaiseShield: (id: string) => void;
  splash: Record<string, number>;
}) {
  return (
    <div className="flex flex-col gap-2">
      {LAYERS.map((layer) => {
        const owner = ownerOf(model, layer.id);
        const isVendor = owner === 'vendor';
        const shieldUp = shields[layer.id];
        const inDanger = raining && !isVendor && !shieldUp;
        const splashes = splash[layer.id] || 0;

        return (
          <div
            key={layer.id}
            className={[
              'relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border-2 px-3 py-2.5 transition-all duration-500',
              isVendor
                ? 'border-sky-300 bg-sky-400 text-white'
                : 'border-dashed border-amber-400 bg-amber-50 text-amber-900',
              inDanger ? 'animate-pulse-ring cursor-pointer' : '',
            ].join(' ')}
            onClick={() => inDanger && onRaiseShield(layer.id)}
            role={inDanger ? 'button' : undefined}
          >
            <span className="flex items-center gap-2 text-sm font-bold font-display">
              <span className="text-xl">{layer.emoji}</span>
              <span className="truncate">{layer.label}</span>
            </span>

            <span className="flex items-center gap-2">
              {isVendor ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">
                  🔒 Auto-safe
                </span>
              ) : shieldUp ? (
                <span className="animate-shield inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  ☂️ Shielded
                </span>
              ) : inDanger ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-white">
                  Tap to shield!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border-2 border-dashed border-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                  You manage
                </span>
              )}

              {/* Splash burst for vendor layers */}
              {isVendor && raining && splashes > 0 && (
                <span className="pointer-events-none flex items-center">
                  {Array.from({ length: Math.min(splashes % 3, 3) }).map((_, k) => (
                    <span
                      key={k}
                      className="splash-drop ml-0.5 text-xs text-sky-100"
                      style={{ animationDelay: `${k * 0.12}s` }}
                    >
                      💦
                    </span>
                  ))}
                </span>
              )}
            </span>

            {/* Deflection shine on vendor layers */}
            {isVendor && raining && (
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-60" />
            )}
          </div>
        );
      })}
    </div>
  );
}
