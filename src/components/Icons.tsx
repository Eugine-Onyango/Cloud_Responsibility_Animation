import { Lock, KeyRound, Umbrella, Smile, CloudRain, Zap } from 'lucide-react';

export function LockBadge({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm"
      style={{ animation: 'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
    >
      <Lock size={size - 6} strokeWidth={3} />
      Vendor
    </span>
  );
}

export function KeyBadge({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-dashed border-amber-500 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700"
      style={{ animation: 'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
    >
      <KeyRound size={size - 6} strokeWidth={3} />
      You
    </span>
  );
}

export function VendorMark() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sky-100">
      <Lock size={20} strokeWidth={3} />
    </span>
  );
}

export function UserMark() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-500">
      <KeyRound size={20} strokeWidth={3} />
    </span>
  );
}

export function ShieldIcon({ size = 16 }: { size?: number }) {
  return <Umbrella size={size} strokeWidth={3} />;
}

export function SmileKey({ size = 26 }: { size?: number }) {
  return (
    <span className="relative inline-flex">
      <span className="flex items-center justify-center rounded-full bg-amber-400 text-white shadow-md" style={{ width: size, height: size }}>
        <Smile size={size - 8} strokeWidth={2.5} />
      </span>
      <span className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-white text-amber-500 shadow-sm" style={{ width: size * 0.55, height: size * 0.55 }}>
        <KeyRound size={(size * 0.55) - 10} strokeWidth={3} />
      </span>
    </span>
  );
}

export function CloudRainIcon({ size = 28 }: { size?: number }) {
  return <CloudRain size={size} strokeWidth={2.5} />;
}

export function BoltIcon({ size = 18 }: { size?: number }) {
  return <Zap size={size} strokeWidth={3} />;
}
