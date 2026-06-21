import { useMemo } from 'react';
import { useWorldCup } from '@/api/worldcup';
import { FilteredMatches } from '@/components/FilteredMatches';
import { LoadingState, ErrorState } from '@/components/states';

export function ResultsView() {
  const { data, isLoading, isError, error } = useWorldCup();

  // Results = matches that have already been played, most recent first.
  const finished = useMemo(
    () => (data?.matches ?? []).filter((m) => m.status === 'finished'),
    [data],
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;

  return <FilteredMatches matches={finished} order="desc" showStatusFilter={false} />;
}
