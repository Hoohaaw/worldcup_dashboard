// Data model for the World Cup 2026 dashboard.
// RawMatch mirrors the openfootball JSON shape; Match is the normalized form
// the UI consumes (with id, parsed kickoff, derived status and goal counts).

export interface Goal {
  name: string;
  minute?: string;
  score?: [number, number];
  penalty?: boolean;
  owngoal?: boolean;
}

export interface Score {
  ft?: [number, number];
  ht?: [number, number];
}

export interface RawMatch {
  round: string;
  num?: number;
  date: string;
  time?: string;
  team1: string;
  team2: string;
  score?: Score;
  goals1?: Goal[];
  goals2?: Goal[];
  group?: string;
  ground?: string;
}

export interface WorldCupData {
  name: string;
  matches: RawMatch[];
}

export type MatchStatus = 'finished' | 'live' | 'upcoming';
export type Stage = 'group' | 'knockout';

export interface Match extends RawMatch {
  id: string;
  kickoff: Date | null;
  stage: Stage;
  status: MatchStatus;
  homeGoals: number | null;
  awayGoals: number | null;
}

export interface GroupStanding {
  team: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface TeamInfo {
  name: string;
  group: string;
}

export interface VenueInfo {
  name: string;
  matchCount: number;
}
