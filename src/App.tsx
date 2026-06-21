import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FixturesView } from '@/views/FixturesView';
import { ResultsView } from '@/views/ResultsView';
import { StandingsView } from '@/views/StandingsView';
import { BracketView } from '@/views/BracketView';
import { TeamsView } from '@/views/TeamsView';

export type Tab = 'fixtures' | 'results' | 'standings' | 'bracket' | 'teams';

export default function App() {
  const [tab, setTab] = useState<Tab>('fixtures');

  return (
    <Layout tab={tab} onTabChange={setTab}>
      {tab === 'fixtures' && <FixturesView />}
      {tab === 'results' && <ResultsView />}
      {tab === 'standings' && <StandingsView />}
      {tab === 'bracket' && <BracketView />}
      {tab === 'teams' && <TeamsView />}
    </Layout>
  );
}
