import type { Tab } from '@/App';

const TABS: { id: Tab; label: string }[] = [
  { id: 'fixtures', label: 'Upcoming' },
  { id: 'results', label: 'Results' },
  { id: 'standings', label: 'Standings' },
  { id: 'bracket', label: 'Bracket' },
  { id: 'teams', label: 'Teams & Venues' },
];

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Nav({ tab, onTabChange }: Props) {
  return (
    <nav className="flex flex-wrap gap-1">
      {TABS.map((t) => {
        const active = t.id === tab;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className={
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors ' +
              (active
                ? 'bg-emerald-500 text-emerald-950'
                : 'bg-white/5 text-zinc-300 hover:bg-white/10')
            }
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
