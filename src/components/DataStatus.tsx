import { useWorldCup } from '@/api/worldcup';

export function DataStatus() {
  const { isFetching, dataUpdatedAt, isError } = useWorldCup();

  const updated =
    dataUpdatedAt > 0
      ? new Date(dataUpdatedAt).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '—';

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-400">
      {isFetching && (
        <span
          className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-zinc-500 border-t-emerald-400"
          aria-label="Refreshing"
        />
      )}
      <span>
        {isError ? 'Update failed' : `Updated ${updated}`}
      </span>
    </div>
  );
}
