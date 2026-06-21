import { describe, it, expect } from 'vitest';
import { parseKickoff, matchStatus, byKickoff } from '@/lib/datetime';
import type { Match } from '@/types';

describe('parseKickoff', () => {
  it('parses "13:00 UTC-6" against the given offset', () => {
    const d = parseKickoff('2026-06-11', '13:00 UTC-6');
    // 13:00 at UTC-6 == 19:00 UTC
    expect(d?.getTime()).toBe(Date.UTC(2026, 5, 11, 19, 0, 0));
  });

  it('pads a single-digit offset correctly (UTC-7)', () => {
    const d = parseKickoff('2026-06-28', '12:00 UTC-7');
    expect(d?.getTime()).toBe(Date.UTC(2026, 5, 28, 19, 0, 0));
  });

  it('handles a positive offset', () => {
    const d = parseKickoff('2026-06-11', '09:30 UTC+2');
    expect(d?.getTime()).toBe(Date.UTC(2026, 5, 11, 7, 30, 0));
  });

  it('returns null when time is missing', () => {
    expect(parseKickoff('2026-06-11', undefined)).toBeNull();
  });

  it('returns null on a malformed time', () => {
    expect(parseKickoff('2026-06-11', 'kickoff soon')).toBeNull();
  });
});

describe('matchStatus', () => {
  const kickoff = new Date(Date.UTC(2026, 5, 11, 19, 0, 0));

  it('is finished when full-time score has two entries', () => {
    expect(matchStatus([2, 0], kickoff, kickoff)).toBe('finished');
  });

  it('is live within the 150-minute window', () => {
    const during = new Date(kickoff.getTime() + 60 * 60 * 1000);
    expect(matchStatus(undefined, kickoff, during)).toBe('live');
  });

  it('is upcoming before kickoff', () => {
    const before = new Date(kickoff.getTime() - 60 * 1000);
    expect(matchStatus(undefined, kickoff, before)).toBe('upcoming');
  });

  it('is upcoming after the live window with no score', () => {
    const after = new Date(kickoff.getTime() + 3 * 60 * 60 * 1000);
    expect(matchStatus(undefined, kickoff, after)).toBe('upcoming');
  });
});

describe('byKickoff', () => {
  it('orders null kickoffs last', () => {
    const a = { kickoff: new Date(2) } as Match;
    const b = { kickoff: null } as Match;
    expect(byKickoff(a, b)).toBeLessThan(0);
    expect(byKickoff(b, a)).toBeGreaterThan(0);
  });
});
