import { useMemo, useState } from 'react';
import { useWorldCup } from '@/api/worldcup';
import { deriveTeams, fixturesForTeam } from '@/lib/teams';
import { deriveVenues, matchesAtVenue } from '@/lib/venues';
import { TeamCard } from '@/components/TeamCard';
import { VenueCard } from '@/components/VenueCard';
import { Modal } from '@/components/Modal';
import { MatchCard } from '@/components/MatchCard';
import { LoadingState, ErrorState } from '@/components/states';

type Selection =
  | { kind: 'team'; name: string; group: string }
  | { kind: 'venue'; name: string };

export function TeamsView() {
  const { data, isLoading, isError, error } = useWorldCup();
  const [selected, setSelected] = useState<Selection | null>(null);

  const matches = useMemo(() => data?.matches ?? [], [data]);
  const teams = useMemo(() => deriveTeams(matches), [matches]);
  const venues = useMemo(() => deriveVenues(matches), [matches]);

  const detailMatches = useMemo(() => {
    if (!selected) return [];
    return selected.kind === 'team'
      ? fixturesForTeam(matches, selected.name)
      : matchesAtVenue(matches, selected.name);
  }, [selected, matches]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">
          Teams <span className="text-zinc-600">({teams.length})</span>
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teams.map((t) => (
            <TeamCard
              key={t.name}
              team={t}
              onClick={() => setSelected({ kind: 'team', name: t.name, group: t.group })}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">
          Host cities & venues <span className="text-zinc-600">({venues.length})</span>
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {venues.map((v) => (
            <VenueCard
              key={v.name}
              venue={v}
              onClick={() => setSelected({ kind: 'venue', name: v.name })}
            />
          ))}
        </div>
      </section>

      {selected && (
        <Modal
          title={selected.name}
          subtitle={
            selected.kind === 'team'
              ? `${selected.group} · ${detailMatches.length} matches`
              : `${detailMatches.length} matches`
          }
          onClose={() => setSelected(null)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {detailMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
