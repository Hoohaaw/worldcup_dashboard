import type { Match, VenueInfo } from '@/types';
import { byKickoff } from '@/lib/datetime';

/**
 * Distinct venues (host cities, e.g. "Mexico City", "Philadelphia") with the
 * number of matches scheduled at each. Sorted by match count desc, then name.
 */
export function deriveVenues(matches: Match[]): VenueInfo[] {
  const counts = new Map<string, number>();
  for (const m of matches) {
    if (!m.ground) continue;
    counts.set(m.ground, (counts.get(m.ground) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, matchCount]) => ({ name, matchCount }))
    .sort((a, b) => b.matchCount - a.matchCount || a.name.localeCompare(b.name));
}

/** All matches at a venue, ordered by kickoff. */
export function matchesAtVenue(matches: Match[], venue: string): Match[] {
  return matches.filter((m) => m.ground === venue).sort(byKickoff);
}
