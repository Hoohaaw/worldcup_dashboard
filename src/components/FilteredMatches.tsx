import { useMemo, useState } from 'react';
import type { Match } from '@/types';
import { MatchList } from '@/components/MatchList';
import { Filters } from '@/components/Filters';
import { EMPTY_FILTERS, applyFilters } from '@/lib/filters';

interface Props {
  matches: Match[];
  /** Chronological order of the rendered list. Defaults to 'asc'. */
  order?: 'asc' | 'desc';
  /** Whether to show the status dropdown (pointless when all matches share a status). */
  showStatusFilter?: boolean;
}

/** Filter UI + grouped match list, shared by the Upcoming and Results views. */
export function FilteredMatches({ matches, order = 'asc', showStatusFilter = true }: Props) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const groups = useMemo(
    () =>
      [...new Set(matches.map((m) => m.group).filter((g): g is string => !!g))].sort(),
    [matches],
  );
  const rounds = useMemo(() => [...new Set(matches.map((m) => m.round))], [matches]);

  const filtered = useMemo(() => applyFilters(matches, filters), [matches, filters]);

  return (
    <div>
      <Filters
        filters={filters}
        onChange={setFilters}
        groups={groups}
        rounds={rounds}
        showStatus={showStatusFilter}
      />
      <MatchList matches={filtered} order={order} />
    </div>
  );
}
