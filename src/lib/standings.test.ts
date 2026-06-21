import { describe, it, expect } from 'vitest';
import { normalize } from '@/api/worldcup';
import { computeStandings } from '@/lib/standings';
import type { RawMatch } from '@/types';

function groupMatch(
  team1: string,
  team2: string,
  ft?: [number, number],
  group = 'Group A',
): RawMatch {
  return {
    round: 'Matchday 1',
    date: '2026-06-11',
    time: '13:00 UTC-6',
    team1,
    team2,
    group,
    ground: 'Mexico City',
    ...(ft ? { score: { ft } } : {}),
  };
}

const NOW = new Date(Date.UTC(2026, 5, 20));

describe('computeStandings', () => {
  it('registers all four teams in a group even before kickoff', () => {
    const raw = [
      groupMatch('Mexico', 'South Africa'),
      groupMatch('Canada', 'Japan'),
    ];
    const table = computeStandings(raw.map((m) => normalize(m, NOW))).get('Group A')!;
    expect(table).toHaveLength(4);
    expect(table.every((r) => r.played === 0)).toBe(true);
  });

  it('reflects Mexico 2-0 South Africa with correct points', () => {
    const raw = [groupMatch('Mexico', 'South Africa', [2, 0])];
    const table = computeStandings(raw.map((m) => normalize(m, NOW))).get('Group A')!;
    const mexico = table.find((r) => r.team === 'Mexico')!;
    const rsa = table.find((r) => r.team === 'South Africa')!;

    expect(mexico).toMatchObject({ played: 1, win: 1, gf: 2, ga: 0, gd: 2, points: 3 });
    expect(rsa).toMatchObject({ played: 1, loss: 1, gf: 0, ga: 2, gd: -2, points: 0 });
    expect(table[0].team).toBe('Mexico'); // winner sorted first
  });

  it('sorts by points -> GD -> GF -> name', () => {
    // All on 3 pts after one win each: differentiate by GD then GF.
    const raw = [
      groupMatch('Alpha', 'Beta', [1, 0]), // Alpha +1, GF1
      groupMatch('Gamma', 'Delta', [3, 0]), // Gamma +3, GF3
      groupMatch('Epsilon', 'Zeta', [2, 0]), // Epsilon +2
    ];
    const table = computeStandings(raw.map((m) => normalize(m, NOW))).get('Group A')!;
    const order = table.slice(0, 3).map((r) => r.team);
    expect(order).toEqual(['Gamma', 'Epsilon', 'Alpha']);
  });

  it('awards a point each for a draw', () => {
    const raw = [groupMatch('Mexico', 'South Africa', [1, 1])];
    const table = computeStandings(raw.map((m) => normalize(m, NOW))).get('Group A')!;
    expect(table.every((r) => (r.played === 1 ? r.points === 1 && r.draw === 1 : true))).toBe(
      true,
    );
  });

  it('returns groups sorted A -> L', () => {
    const raw = [
      groupMatch('Mexico', 'South Africa', undefined, 'Group C'),
      groupMatch('Canada', 'Japan', undefined, 'Group A'),
      groupMatch('Spain', 'Brazil', undefined, 'Group B'),
    ];
    const keys = [...computeStandings(raw.map((m) => normalize(m, NOW))).keys()];
    expect(keys).toEqual(['Group A', 'Group B', 'Group C']);
  });
});
