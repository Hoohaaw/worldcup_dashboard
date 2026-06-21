import type { MatchStatus } from '@/types';

const STYLES: Record<MatchStatus, { label: string; cls: string }> = {
  finished: { label: 'FT', cls: 'bg-zinc-700 text-zinc-200' },
  live: { label: 'LIVE', cls: 'bg-red-500 text-white animate-pulse' },
  upcoming: { label: 'Upcoming', cls: 'bg-emerald-500/20 text-emerald-300' },
};

export function StatusBadge({ status }: { status: MatchStatus }) {
  const { label, cls } = STYLES[status];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${cls}`}>
      {label}
    </span>
  );
}
