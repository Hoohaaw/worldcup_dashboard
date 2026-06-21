import type { ReactNode } from 'react';
import type { Tab } from '@/App';
import { Nav } from '@/components/Nav';
import { DataStatus } from '@/components/DataStatus';

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
}

export function Layout({ tab, onTabChange, children }: Props) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                ⚽ FIFA World Cup 2026
              </h1>
              <p className="text-xs text-zinc-400">
                Canada · USA · Mexico — 11 Jun – 19 Jul
              </p>
            </div>
            <DataStatus />
          </div>
          <Nav tab={tab} onTabChange={onTabChange} />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
