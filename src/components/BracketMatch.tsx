import type { Match } from '@/types';
import { formatKickoffTime } from '@/lib/datetime';

/** Compact knockout match card. team1/team2 may be placeholders ("2A", "W74")
 *  until results populate them. */
export function BracketMatch({ match }: { match: Match }) {
  const played = match.homeGoals != null && match.awayGoals != null;
  const winnerHome = played && match.homeGoals! > match.awayGoals!;
  const winnerAway = played && match.awayGoals! > match.homeGoals!;

  const Row = ({ name, goals, winner }: { name: string; goals: number | null; winner: boolean }) => (
    <div className="flex items-center justify-between gap-2">
      <span className={`truncate ${winner ? 'font-semibold text-emerald-300' : 'text-zinc-200'}`}>
        {name}
      </span>
      <span className="tabular-nums text-zinc-300">{goals ?? ''}</span>
    </div>
  );

  return (
    <div className="w-44 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-xs">
      <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
        <span>#{match.num}</span>
        <span>{played ? 'FT' : formatKickoffTime(match.kickoff)}</span>
      </div>
      <Row name={match.team1} goals={match.homeGoals} winner={winnerHome} />
      <Row name={match.team2} goals={match.awayGoals} winner={winnerAway} />
      <div className="mt-1 truncate text-[10px] text-zinc-500">{match.ground}</div>
    </div>
  );
}
