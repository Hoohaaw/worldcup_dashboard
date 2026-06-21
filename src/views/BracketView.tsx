import { useMemo } from 'react';
import { useWorldCup } from '@/api/worldcup';
import { Bracket } from '@/components/Bracket';
import { LoadingState, ErrorState, EmptyState } from '@/components/states';

export function BracketView() {
  const { data, isLoading, isError, error } = useWorldCup();

  const knockout = useMemo(
    () => (data?.matches ?? []).filter((m) => m.stage === 'knockout'),
    [data],
  );

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;
  if (knockout.length === 0) return <EmptyState label="The knockout bracket isn't set yet." />;

  return (
    <div>
      <p className="mb-4 text-xs text-zinc-500">
        Placeholders like <code className="text-zinc-400">2A</code> (group runner-up) or{' '}
        <code className="text-zinc-400">W74</code> (winner of match 74) resolve as results land.
      </p>
      <Bracket matches={knockout} />
    </div>
  );
}
