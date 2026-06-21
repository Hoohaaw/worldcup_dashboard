import type { GroupStanding } from '@/types';

interface Props {
  group: string;
  rows: GroupStanding[];
}

const COLS = ['P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'] as const;

export function StandingsTable({ group, rows }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 px-3 py-2 text-sm font-semibold text-zinc-200">
        {group}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] text-zinc-500">
            <th className="px-3 py-1.5 text-left font-medium">Team</th>
            {COLS.map((c) => (
              <th key={c} className="px-1.5 py-1.5 text-right font-medium tabular-nums">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const rank = i + 1;
            // Top 2 advance; 3rd may advance via best-thirds (decided by the
            // source's knockout placeholders, not computed here).
            const advance = rank <= 2;
            const thirdFlag = rank === 3;
            return (
              <tr
                key={r.team}
                className={
                  'border-t border-white/5 ' +
                  (advance ? 'bg-emerald-500/10' : thirdFlag ? 'bg-amber-500/5' : '')
                }
              >
                <td className="px-3 py-1.5">
                  <span className="mr-2 text-[11px] text-zinc-500 tabular-nums">{rank}</span>
                  {r.team}
                  {thirdFlag && (
                    <span className="ml-1.5 text-[10px] text-amber-400">3rd</span>
                  )}
                </td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.played}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.win}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.draw}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.loss}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.gf}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">{r.ga}</td>
                <td className="px-1.5 py-1.5 text-right tabular-nums">
                  {r.gd > 0 ? `+${r.gd}` : r.gd}
                </td>
                <td className="px-1.5 py-1.5 text-right font-bold tabular-nums">
                  {r.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
