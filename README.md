# ⚽ FIFA World Cup 2026 Dashboard

> A fast, modern dashboard for the 2026 World Cup across **Canada 🇨🇦 · USA 🇺🇸 · Mexico 🇲🇽** — fixtures, live results, group standings, the knockout bracket, and venues, all in one place.

Kickoff times are shown in **your computer's local timezone**, and match data is pulled live from the community-maintained [openfootball](https://github.com/openfootball/worldcup.json) dataset.

---

## ✨ Features

- **🗓️ Upcoming** — the dashboard home: live and upcoming matches, grouped by day with a countdown to kickoff.
- **🏁 Results** — every match that's already been played, newest first, with scorers.
- **📊 Standings** — auto-computed group tables (points → goal difference → goals for), updating as results come in.
- **🏆 Bracket** — the knockout stage from Round of 32 to the Final.
- **🌍 Teams & Venues** — all qualified teams by group and the host stadiums.
- **🔎 Filters** — search by team and filter by group, stage, and status.
- **🔴 Live status** — matches are flagged live during their kickoff window, with auto-refreshing data.
- **🕒 Local time** — kickoff times render in the viewer's own timezone, no configuration needed.

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite 6](https://vite.dev/)** for dev/build tooling
- **[Tailwind CSS 4](https://tailwindcss.com/)** for styling
- **[TanStack Query](https://tanstack.com/query)** for data fetching & caching
- **[Vitest](https://vitest.dev/)** for unit tests

## 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev
```

### Available scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Type-check and build for production          |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint                                   |
| `npm test`        | Run the Vitest unit tests                    |

## 📡 Data Source

Match data comes from the open-source [`openfootball/worldcup.json`](https://github.com/openfootball/worldcup.json) project. The fetch is isolated to a single adapter ([`src/api/worldcup.ts`](src/api/worldcup.ts)) — to swap in a live, keyed API later, reimplement `fetchWorldCup()` and the rest of the app stays unchanged.

## 📁 Project Structure

```
src/
├── api/         # Data fetching & normalization (the swap point)
├── components/  # Reusable UI (match cards, filters, nav, …)
├── lib/         # Pure logic: datetime, standings, filters (unit-tested)
├── views/       # Top-level tabs: Upcoming, Results, Standings, Bracket, Teams
└── types.ts     # Shared data model
```

---

<p align="center">Built for the love of the game ⚽</p>
