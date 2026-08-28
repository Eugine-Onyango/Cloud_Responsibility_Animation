import { useState } from 'react';
import { MODELS, ModelId } from '@/data/model';
import TabSwitcher from '@/components/TabSwitcher';
import RainSimulator from '@/components/RainSimulator';
import AnalogyCard from '@/components/AnalogyCard';

export default function App() {
  const [active, setActive] = useState<ModelId>('saas');
  const model = MODELS.find((m) => m.id === active)!;

  const [raining, setRaining] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 px-4 py-6 sm:px-6 sm:py-10">
      {/* Decorative floating bubbles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-sky-200/40 blur-2xl" />
        <div className="absolute right-0 top-40 h-52 w-52 rounded-full bg-amber-200/40 blur-2xl" />
        <div className="absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-emerald-200/40 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold text-slate-500 shadow-sm backdrop-blur">
            🍳 The Cloud Kitchen
          </div>
          <h1 className="text-3xl font-bold font-display text-slate-800 sm:text-5xl">
            Who Cooks What in the Cloud?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            A friendly guide to the Cloud Responsibility Model. Pick a setup below, watch which layers the
            vendor locks down and which ones you carry the keys to — then test it with a silly rain cloud.
          </p>
        </header>

        {/* Tab switcher */}
        <div className="mb-6">
          <TabSwitcher active={active} onSelect={setActive} />
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: summary + analogy */}
          <div className="lg:col-span-2">
            <div className="mb-4 rounded-3xl border-2 border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-4xl">{model.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-800">{model.label}</h2>
                  <p className="text-sm font-bold text-slate-400">{model.title}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{model.tagline}</p>

              {/* Quick legend */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-3">
                  <p className="font-bold font-display text-sky-700">🔒 Vendor Manages</p>
                  <p className="mt-1 text-sky-600/80">The cloud provider locks and defends these.</p>
                </div>
                <div className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-3">
                  <p className="font-bold font-display text-amber-700">🗝️ You Manage</p>
                  <p className="mt-1 text-amber-600/80">You hold the keys — and the umbrella!</p>
                </div>
              </div>
            </div>

            <AnalogyCard model={model} />
          </div>

          {/* Right: interactive stack + rain */}
          <div className="lg:col-span-3">
            <RainSimulator
              model={model}
              onRainChange={setRaining}
              onShieldsChange={() => {}}
            />
          </div>
        </div>

        {/* Footer hint */}
        <footer className="mt-8 text-center text-xs text-slate-400">
          Built for beginners — switch tabs to see responsibility shift, then hit{' '}
          <span className="font-bold text-amber-500">Test My Setup!</span> to watch the rain.
          {raining && ' — click the glowing layers to raise your umbrella!'}
        </footer>
      </div>
    </div>
  );
}
