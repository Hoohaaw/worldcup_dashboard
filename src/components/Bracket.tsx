import { useMemo } from 'react';
import type { Match } from '@/types';
import { BracketMatch } from '@/components/BracketMatch';
import { byKickoff } from '@/lib/datetime';

// Knockout rounds in order. "Match for third place" is shown alongside the Final.
const ROUND_ORDER = [
  'Round of 32',
  'Round of 16',
  'Quarter-final',
  'Semi-final',
  'Match for third place',
  'Final',
] as const;

export function Bracket({ matches }: { matches: Match[] }) {
  const columns = useMemo(() => {
    const byRound = new Map<string, Match[]>();
    for (const m of matches) {
      const arr = byRound.get(m.round);
      if (arr) arr.push(m);
      else byRound.set(m.round, [m]);
    }
    return ROUND_ORDER.map((round) => ({
      round,
      matches: (byRound.get(round) ?? []).sort(byKickoff),
    })).filter((c) => c.matches.length > 0);
  }, [matches]);

  return (
    <div className="flex gap-5 overflow-x-auto pb-4">
      {columns.map((col) => (
        <section key={col.round} className="flex shrink-0 flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {col.round}
            <span className="ml-1 text-zinc-600">({col.matches.length})</span>
          </h3>
          <div className="flex flex-col gap-3">
            {col.matches.map((m) => (
              <BracketMatch key={m.id} match={m} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
