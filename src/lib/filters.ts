import type { Match, MatchStatus } from '@/types';

export interface FilterState {
  team: string;
  group: string; // '' = all
  round: string; // '' = all
  status: MatchStatus | 'all';
}

export const EMPTY_FILTERS: FilterState = {
  team: '',
  group: '',
  round: '',
  status: 'all',
};

/** Apply the team/group/round/status filters to a list of matches. */
export function applyFilters(matches: Match[], filters: FilterState): Match[] {
  const q = filters.team.trim().toLowerCase();
  return matches.filter((m) => {
    if (q && !m.team1.toLowerCase().includes(q) && !m.team2.toLowerCase().includes(q))
      return false;
    if (filters.group && m.group !== filters.group) return false;
    if (filters.round && m.round !== filters.round) return false;
    if (filters.status !== 'all' && m.status !== filters.status) return false;
    return true;
  });
}
