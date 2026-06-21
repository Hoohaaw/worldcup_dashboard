import type { Goal, Match } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import { TeamChip } from '@/components/TeamChip';
import { formatCountdown, formatKickoffDayTime } from '@/lib/datetime';

function Scorers({ goals }: { goals?: Goal[] }) {
  if (!goals || goals.length === 0) return null;
  return (
    <ul className="space-y-0.5 text-[11px] text-zinc-400">
      {goals.map((g, i) => (
        <li key={`${g.name}-${i}`}>
          ⚽ {g.name}
          {g.minute ? ` ${g.minute}'` : ''}
          {g.penalty ? ' (pen)' : ''}
          {g.owngoal ? ' (og)' : ''}
        </li>
      ))}
    </ul>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const played = match.homeGoals != null && match.awayGoals != null;

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{match.group ?? match.round}</span>
        <div className="flex items-center gap-2">
          <span>{match.ground}</span>
          <StatusBadge status={match.status} />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
        <TeamChip name={match.team1} />
        <span className="text-right text-lg font-bold tabular-nums">
          {played ? match.homeGoals : ''}
        </span>
        <TeamChip name={match.team2} />
        <span className="text-right text-lg font-bold tabular-nums">
          {played ? match.awayGoals : ''}
        </span>
      </div>

      {!played && (
        <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
          <span>{formatKickoffDayTime(match.kickoff)}</span>
          <span className="text-emerald-300">{formatCountdown(match.kickoff)}</span>
        </div>
      )}

      {played && (match.goals1?.length || match.goals2?.length) ? (
        <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/5 pt-2">
          <Scorers goals={match.goals1} />
          <Scorers goals={match.goals2} />
        </div>
      ) : null}
    </article>
  );
}
