import type { FilterState } from '@/lib/filters';

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  groups: string[];
  rounds: string[];
  showStatus?: boolean;
}

const selectCls =
  'rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 focus:border-emerald-400 focus:outline-none';

export function Filters({ filters, onChange, groups, rounds, showStatus = true }: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="mb-5 flex flex-wrap gap-2">
      <input
        type="search"
        value={filters.team}
        onChange={(e) => set({ team: e.target.value })}
        placeholder="Search team…"
        className={`${selectCls} min-w-40 flex-1`}
      />

      <select
        value={filters.group}
        onChange={(e) => set({ group: e.target.value })}
        className={selectCls}
      >
        <option value="">All groups</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={filters.round}
        onChange={(e) => set({ round: e.target.value })}
        className={selectCls}
      >
        <option value="">All stages</option>
        {rounds.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {showStatus && (
        <select
          value={filters.status}
          onChange={(e) => set({ status: e.target.value as FilterState['status'] })}
          className={selectCls}
        >
          <option value="all">Any status</option>
          <option value="live">Live</option>
          <option value="upcoming">Upcoming</option>
          <option value="finished">Finished</option>
        </select>
      )}
    </div>
  );
}
