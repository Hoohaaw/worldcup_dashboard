interface MessageProps {
  title: string;
  detail?: string;
}

function Centered({ title, detail }: MessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
      <p className="text-lg font-medium text-zinc-200">{title}</p>
      {detail && <p className="max-w-md text-sm text-zinc-400">{detail}</p>}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
      <p className="text-sm text-zinc-400">Loading World Cup data…</p>
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <Centered
      title="Couldn't load the data"
      detail={message ?? 'Check your connection and try again.'}
    />
  );
}

export function EmptyState({ label }: { label: string }) {
  return <Centered title="Nothing to show" detail={label} />;
}
