import type { VenueInfo } from '@/types';

interface Props {
  venue: VenueInfo;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left transition-colors hover:border-emerald-400/40 hover:bg-white/[0.06]"
    >
      <span className="font-medium text-zinc-100">📍 {venue.name}</span>
      <span className="text-[11px] text-zinc-500">
        {venue.matchCount} {venue.matchCount === 1 ? 'match' : 'matches'}
      </span>
    </button>
  );
}
