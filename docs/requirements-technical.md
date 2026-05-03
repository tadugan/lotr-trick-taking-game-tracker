# Technical Requirements

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Build tool | Vite |
| Linter/Formatter | Biome |
| Test runner | Vitest + Testing Library |

---

## Data Model

### Game (static data, bundled with app)

```ts
type VictoryCondition = 'short' | 'long';

type Character = {
  name: string;
  required: boolean;
};

type Chapter = {
  number: number;       // 1–18 for FotR, 19–35 for TT
  name: string;
  victoryCondition: VictoryCondition;
  characters: Character[];
};

type Game = {
  id: 'fotr' | 'tt' | 'rotk';
  title: string;
  chapters: Chapter[];
  released: boolean;
};
```

### Save File (persisted in localStorage)

```ts
type ChapterProgress = {
  chapterNumber: number;
  completed: boolean;
};

type SaveFile = {
  id: string;           // UUID, generated on creation
  gameId: 'fotr' | 'tt' | 'rotk';
  name: string;         // user-defined label
  createdAt: string;    // ISO 8601 date string
  updatedAt: string;    // ISO 8601 date string
  chapters: ChapterProgress[];
};
```

### localStorage Schema

All save files are stored under a single key:

```
lotr-tracker:saves  →  SaveFile[]  (JSON)
```

---

## Routing

| Route | Description |
|---|---|
| `/` | Home — list all save files, option to create new |
| `/saves/new` | Create a new save file (choose game, enter name) |
| `/saves/:id` | Chapter list for a specific save file |

Chapter detail (characters, completion toggle) is an **expandable row** on the `/saves/:id` page — no separate route needed.

---

## Data Portability

- **Export**: serialize a `SaveFile` to JSON and trigger a browser download (`<a download>`)
- **Import**: accept a `.json` file upload, validate shape, merge into localStorage

---

## Static Game Data

Chapter data for all games is bundled as TypeScript constants (not fetched from an API). This keeps the app fully offline-capable and avoids any network dependency. Data lives in `src/data/games.ts`.

---

## Testing

- Unit tests for localStorage read/write utilities
- Unit tests for any data transformation logic
- Component tests for critical flows (create save, toggle chapter, export/import)

---

## Browser Support

Modern mobile browsers (iOS Safari, Android Chrome). No IE11 or legacy support required.

---

## Constraints

- No backend, no database, no authentication
- No external API calls at runtime
- Must function fully offline
