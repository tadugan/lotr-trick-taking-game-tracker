# LotR Trick-Taking Game Tracker

A mobile-first web app for tracking progress through the Lord of the Rings Trick-Taking Game trilogy.

## Games Supported

| Game | Chapters |
|---|---|
| The Fellowship of the Ring | 1–18 |
| The Two Towers | 19–35 |
| The Return of the King | Coming soon |

## Features

- Create save files for each game — one per playthrough group
- Track chapter completion across all scenarios
- View characters available for each chapter
- Rename and delete saves
- Export saves to JSON and import them back (backup / device transfer)
- All data stored locally in the browser — no account required

## Tech Stack

- [React 19](https://react.dev/)
- [TanStack Start](https://tanstack.com/start) (SSR framework)
- [TanStack Router](https://tanstack.com/router) (file-based routing)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/) (testing)
- [Biome](https://biomejs.dev/) (linting & formatting)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm test          # Run tests
npm run check     # Lint + format check (Biome)
```
