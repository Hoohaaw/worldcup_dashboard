import type { Match, TeamInfo } from '@/types';
import { byKickoff } from '@/lib/datetime';

/**
 * Distinct teams, derived from group-stage matches only — knockout matches use
 * placeholders ("2A", "W74") that are not real teams. Each team maps to its
 * group; sorted by name. Yields the 48 participating nations.
 */
export function deriveTeams(matches: Match[]): TeamInfo[] {
  const byName = new Map<string, string>();
  for (const m of matches) {
    if (m.stage !== 'group' || !m.group) continue;
    if (!byName.has(m.team1)) byName.set(m.team1, m.group);
    if (!byName.has(m.team2)) byName.set(m.team2, m.group);
  }
  return [...byName.entries()]
    .map(([name, group]) => ({ name, group }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** All matches involving a team (group + knockout), ordered by kickoff. */
export function fixturesForTeam(matches: Match[], team: string): Match[] {
  return matches
    .filter((m) => m.team1 === team || m.team2 === team)
    .sort(byKickoff);
}
