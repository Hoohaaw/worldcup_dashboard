// Placeholder codes from the source: "2A"/"2B" (group-position) or "W74"
// (winner-of-match). Real team names are everything else.
function isPlaceholder(name: string): boolean {
  return /^(W\d+|L\d+|\d+[A-L](\/[A-L])*|[1-4][A-L])$/.test(name);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

interface Props {
  name: string;
  className?: string;
}

export function TeamChip({ name, className = '' }: Props) {
  const placeholder = isPlaceholder(name);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={
          'inline-flex h-6 w-9 shrink-0 items-center justify-center rounded text-[10px] font-bold ' +
          (placeholder ? 'bg-white/5 text-zinc-500' : 'bg-emerald-500/15 text-emerald-300')
        }
      >
        {placeholder ? name : initials(name)}
      </span>
      <span className={placeholder ? 'text-zinc-500 italic' : 'text-zinc-100'}>
        {name}
      </span>
    </span>
  );
}
