import { useMemo } from 'react';
import type { Match } from '@/types';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/states';
import { byKickoff, formatMatchDay } from '@/lib/datetime';

/** Group matches by calendar date, ordered, with day section headers. */
export function MatchList({
  matches,
  order = 'asc',
}: {
  matches: Match[];
  order?: 'asc' | 'desc';
}) {
  const byDate = useMemo(() => {
    const sorted = [...matches].sort(byKickoff);
    const map = new Map<string, Match[]>();
    for (const m of sorted) {
      const key = m.date || 'TBD';
      const arr = map.get(key);
      if (arr) arr.push(m);
      else map.set(key, [m]);
    }
    const entries = [...map.entries()];
    if (order === 'desc') {
      entries.reverse();
      for (const [, dayMatches] of entries) dayMatches.reverse();
    }
    return entries;
  }, [matches, order]);

  if (matches.length === 0) {
    return <EmptyState label="No matches match the current filters." />;
  }

  return (
    <div className="space-y-6">
      {byDate.map(([date, dayMatches]) => (
        <section key={date}>
          <h2 className="mb-2 text-sm font-semibold text-zinc-300">
            {formatMatchDay(date)}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dayMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
