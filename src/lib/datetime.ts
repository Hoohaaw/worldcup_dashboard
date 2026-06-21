import type { Match, MatchStatus, Score } from '@/types';

// openfootball times look like "13:00 UTC-6" (host-city local time + UTC offset).
// World Cup 2026 spans UTC-4 .. UTC-7, so we keep the per-match offset.
const KICKOFF_RE = /^(\d{1,2}):(\d{2})\s*UTC([+-])(\d{1,2})(?::(\d{2}))?/i;

const pad = (n: number | string) => String(n).padStart(2, '0');

/** Parse a date ("2026-06-11") + time ("13:00 UTC-6") into a Date, or null. */
export function parseKickoff(date: string, time?: string): Date | null {
  if (!date || !time) return null;
  const m = KICKOFF_RE.exec(time.trim());
  if (!m) return null;
  const [, hh, mm, sign, offH, offM] = m;
  const iso = `${date}T${pad(hh)}:${pad(mm)}:00${sign}${pad(offH)}:${pad(offM ?? 0)}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

// A full-time score with both entries means the match is over. Otherwise we
// treat a ~150min window after kickoff as "live" (heuristic — the source is
// hand-updated, not truly real-time).
const LIVE_WINDOW_MS = 150 * 60 * 1000;

export function matchStatus(
  ft: Score['ft'] | undefined,
  kickoff: Date | null,
  now: Date = new Date(),
): MatchStatus {
  if (ft && ft.length === 2) return 'finished';
  if (kickoff) {
    const start = kickoff.getTime();
    const t = now.getTime();
    if (t >= start && t < start + LIVE_WINDOW_MS) return 'live';
  }
  return 'upcoming';
}

/** "Thursday, 11 June 2026" for date section headers. */
export function formatMatchDay(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Local-time kickoff like "19:00" using the viewer's timezone. */
export function formatKickoffTime(kickoff: Date | null): string {
  if (!kickoff) return 'TBD';
  return kickoff.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Local day + time like "Sat 21 Jun · 19:00" in the viewer's timezone. */
export function formatKickoffDayTime(kickoff: Date | null): string {
  if (!kickoff) return 'TBD';
  const day = kickoff.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  return `${day} · ${formatKickoffTime(kickoff)}`;
}

/** Compact "in 3d 4h" / "in 12m" countdown, or "" if in the past / unknown. */
export function formatCountdown(kickoff: Date | null, now: Date = new Date()): string {
  if (!kickoff) return '';
  let diff = kickoff.getTime() - now.getTime();
  if (diff <= 0) return '';
  const day = 86_400_000;
  const hour = 3_600_000;
  const min = 60_000;
  const days = Math.floor(diff / day);
  diff -= days * day;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;
  const mins = Math.floor(diff / min);
  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${mins}m`;
  return `in ${mins}m`;
}

/** Shared comparator: order by kickoff, null kickoffs last. */
export function byKickoff(a: Match, b: Match): number {
  if (a.kickoff && b.kickoff) return a.kickoff.getTime() - b.kickoff.getTime();
  if (a.kickoff) return -1;
  if (b.kickoff) return 1;
  return 0;
}
