import { useMemo } from 'react';
import { useWorldCup } from '@/api/worldcup';
import { FilteredMatches } from '@/components/FilteredMatches';
import { LoadingState, ErrorState } from '@/components/states';

export function FixturesView() {
  const { data, isLoading, isError, error } = useWorldCup();

  // The dashboard is "what's on now and next" — live + upcoming, never finished.
  const upcoming = useMemo(
    () => (data?.matches ?? []).filter((m) => m.status !== 'finished'),
    [data],
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;

  return <FilteredMatches matches={upcoming} />;
}
