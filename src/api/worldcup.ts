import { useQuery } from '@tanstack/react-query';
import type { Match, RawMatch, Stage, WorldCupData } from '@/types';
import { matchStatus, parseKickoff } from '@/lib/datetime';

// THE SWAP POINT: every view reads from this adapter. To move to a keyed live
// API later, reimplement fetchWorldCup() to return WorldCupData and keep the
// rest of the app unchanged.
const SOURCE_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

export async function fetchWorldCup(): Promise<WorldCupData> {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error(`Failed to load World Cup data (HTTP ${res.status})`);
  }
  // Source is served as text/plain; parse as JSON regardless of content-type.
  return (await res.json()) as WorldCupData;
}

/** Stable id: knockout matches carry `num`; group matches don't, so fall back
 *  to a deterministic key built from date + teams. */
function matchId(raw: RawMatch): string {
  if (raw.num != null) return `m-${raw.num}`;
  return `g-${raw.date}-${raw.team1}-${raw.team2}`;
}

export function normalize(raw: RawMatch, now: Date = new Date()): Match {
  const kickoff = parseKickoff(raw.date, raw.time);
  const stage: Stage = raw.group ? 'group' : 'knockout';
  const ft = raw.score?.ft;
  return {
    ...raw,
    id: matchId(raw),
    kickoff,
    stage,
    status: matchStatus(ft, kickoff, now),
    homeGoals: ft ? ft[0] : null,
    awayGoals: ft ? ft[1] : null,
  };
}

export function normalizeAll(data: WorldCupData, now: Date = new Date()): Match[] {
  return data.matches.map((m) => normalize(m, now));
}

export interface WorldCupResult {
  name: string;
  matches: Match[];
}

export function useWorldCup() {
  return useQuery<WorldCupResult>({
    queryKey: ['worldcup-2026'],
    queryFn: async () => {
      const data = await fetchWorldCup();
      return { name: data.name, matches: normalizeAll(data) };
    },
  });
}
