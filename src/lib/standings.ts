import type { GroupStanding, Match } from '@/types';

function blank(team: string): GroupStanding {
  return { team, played: 0, win: 0, draw: 0, loss: 0, gf: 0, ga: 0, gd: 0, points: 0 };
}

/**
 * Compute group tables from group-stage matches.
 * - Every team is registered first, so all 4 show even before kickoff.
 * - Only matches with both full-time goals are accumulated.
 * - Sort: points -> GD -> GF -> name (FIFA's first tiebreakers; full
 *   head-to-head is a documented future refinement).
 * Returns a Map keyed by group name, sorted A -> L.
 */
export function computeStandings(matches: Match[]): Map<string, GroupStanding[]> {
  const groups = new Map<string, Map<string, GroupStanding>>();

  const ensure = (group: string, team: string): GroupStanding => {
    let table = groups.get(group);
    if (!table) {
      table = new Map();
      groups.set(group, table);
    }
    let row = table.get(team);
    if (!row) {
      row = blank(team);
      table.set(team, row);
    }
    return row;
  };

  for (const m of matches) {
    if (m.stage !== 'group' || !m.group) continue;
    // Register both teams regardless of whether the match has been played.
    const home = ensure(m.group, m.team1);
    const away = ensure(m.group, m.team2);

    if (m.homeGoals == null || m.awayGoals == null) continue;
    const hg = m.homeGoals;
    const ag = m.awayGoals;

    home.played++;
    away.played++;
    home.gf += hg;
    home.ga += ag;
    away.gf += ag;
    away.ga += hg;

    if (hg > ag) {
      home.win++;
      away.loss++;
      home.points += 3;
    } else if (hg < ag) {
      away.win++;
      home.loss++;
      away.points += 3;
    } else {
      home.draw++;
      away.draw++;
      home.points += 1;
      away.points += 1;
    }
  }

  const result = new Map<string, GroupStanding[]>();
  const sortedGroupNames = [...groups.keys()].sort();
  for (const name of sortedGroupNames) {
    const rows = [...groups.get(name)!.values()];
    for (const row of rows) row.gd = row.gf - row.ga;
    rows.sort(
      (a, b) =>
        b.points - a.points ||
        b.gd - a.gd ||
        b.gf - a.gf ||
        a.team.localeCompare(b.team),
    );
    result.set(name, rows);
  }
  return result;
}
