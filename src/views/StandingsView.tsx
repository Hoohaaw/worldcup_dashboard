import { useMemo } from 'react';
import { useWorldCup } from '@/api/worldcup';
import { computeStandings } from '@/lib/standings';
import { StandingsTable } from '@/components/StandingsTable';
import { LoadingState, ErrorState, EmptyState } from '@/components/states';

export function StandingsView() {
  const { data, isLoading, isError, error } = useWorldCup();

  const tables = useMemo(
    () => (data ? [...computeStandings(data.matches).entries()] : []),
    [data],
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;
  if (tables.length === 0) return <EmptyState label="No group standings available yet." />;

  return (
    <div>
      <p className="mb-4 text-xs text-zinc-500">
        <span className="mr-3">
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500/40 align-middle" />
          Top 2 advance
        </span>
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-amber-500/30 align-middle" />
          3rd — may advance (best thirds)
        </span>
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tables.map(([group, rows]) => (
          <StandingsTable key={group} group={group} rows={rows} />
        ))}
      </div>
    </div>
  );
}
