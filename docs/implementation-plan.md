# Implementation Plan

## Overview

Build the MVP in 6 phases, each delivering a vertical slice of working functionality. Phases build on each other — complete them in order.

**Stack context:** TanStack Start (SSR-capable React framework), TanStack Router (file-based routing), Tailwind CSS v4, TypeScript, localStorage for persistence.

---

## Phase 1 — Foundation

Set up types, static game data, and the localStorage data layer. No UI yet — just the core logic that everything else depends on.

- [x] Define shared TypeScript types in `src/types.ts`
  - `VictoryCondition`, `Character`, `Chapter`, `Game`
  - `ChapterProgress`, `SaveFile`
- [x] Create placeholder game data in `src/data/games.ts`
  - Fellowship of the Ring: chapters 1–18, all Short, characters: Bilbo, Samwise, Strider, Gandalf (all optional for now)
  - The Two Towers: chapters 19–35, same placeholder structure
  - Return of the King: entry with `released: false`, empty chapters array
- [x] Create localStorage utilities in `src/lib/storage.ts`
  - `loadSaves(): SaveFile[]`
  - `saveSaves(saves: SaveFile[]): void`
  - `createSave(gameId, name): SaveFile` — generates UUID, initializes chapter progress
  - `updateSave(save: SaveFile): void`
  - `deleteSave(id: string): void`
- [x] Write unit tests for all storage utilities (`src/lib/storage.test.ts`)

---

## Phase 2 — App Shell & Navigation

Set up the root layout, global styles, and the page skeleton for all three routes.

- [x] Update `src/routes/__root.tsx`
  - Set correct `<title>` ("LotR Trick-Taking Tracker")
  - Add mobile viewport meta tag (already present, confirm it's correct)
  - Add a persistent top app bar with app title and back-navigation affordance
- [x] Create `src/routes/index.tsx` — Home page (stub: "Your saves will appear here")
- [x] Create `src/routes/saves.new.tsx` — New Save page (stub)
- [x] Create `src/routes/saves.$id.tsx` — Save Detail page (stub)
- [x] Confirm TanStack Router auto-generates `src/routeTree.gen.ts` correctly on dev start
- [x] Verify navigation between all three routes works

---

## Phase 3 — Home Page

List all save files. Entry point for the whole app.

- [x] Load saves from localStorage on mount
- [x] Display save files grouped by game (FotR / TT / RotK)
- [x] Each save card shows:
  - Save name
  - Game title
  - Progress summary: "X / Y chapters complete"
  - Tap/click navigates to Save Detail
- [x] Empty state: friendly message + prompt to create first save when no saves exist
- [x] "New Save" button — navigates to `/saves/new`
- [x] Delete save from home page (swipe action on mobile, or icon button) with confirmation

---

## Phase 4 — Create Save Page (`/saves/new`)

Form to create a new save file.

- [x] Game selector — three options (FotR, TT, RotK)
  - RotK option is visible but disabled with a "Coming Soon" label
- [x] Save name text input (required, max ~40 chars)
- [x] Submit creates the save via `createSave()`, redirects to the new save's detail page
- [x] Cancel / back navigates to Home without creating anything
- [x] Basic form validation (name required, game required)

---

## Phase 5 — Save Detail Page (`/saves/:id`)

The main tracking view. Shows all chapters for the save's game with completion toggles and an expandable character list.

- [x] Load the save file from localStorage by ID; redirect to `/` if not found
- [x] Page header: save name, game title, overall progress bar + "X / Y" count
- [x] Chapter list — one row per chapter, in numerical order:
  - Chapter number and name
  - Victory condition badge (Short / Long)
  - Completion toggle (checkbox or tap-to-toggle)
  - Expand/collapse chevron to reveal character list
- [x] Expanded chapter row shows:
  - List of characters with their names
  - Required characters visually distinguished from optional
- [x] Toggling completion updates localStorage immediately
- [x] "Rename save" affordance (inline edit or modal)

---

## Phase 6 — Export & Import

Data portability as a safety net against browser data loss.

- [x] **Export** button on Save Detail page (or Home page per-card)
  - Serializes `SaveFile` to JSON
  - Triggers browser download as `<save-name>.json`
- [x] **Import** button on Home page
  - File input accepting `.json` files
  - Parse and validate the JSON matches the `SaveFile` shape
  - On success: add to saves (assign new UUID to avoid ID collision) and navigate to it
  - On failure: display a clear error message

---

## Phase 7 — Polish & QA

Final pass before calling MVP done.

- [x] Responsive layout QA on mobile (iOS Safari, Android Chrome) and desktop
- [x] All interactive elements meet minimum 44×44px tap target size
- [x] Empty states and edge cases:
  - Save with 0 chapters complete
  - Save with all chapters complete (celebrate it!)
  - Importing a malformed JSON file
- [x] Page titles update correctly per route
- [x] No console errors or warnings in production build
- [x] Run `npm run build` — confirm clean build with no TypeScript errors

---

## File Structure (target end state)

```
src/
  data/
    games.ts              # static chapter/character data
  lib/
    storage.ts            # localStorage CRUD utilities
    storage.test.ts       # unit tests
  routes/
    __root.tsx            # app shell, top bar
    index.tsx             # home — save file list
    saves.new.tsx         # create new save
    saves.$id.tsx         # save detail — chapter list
  types.ts                # shared TypeScript types
  styles.css              # global styles (Tailwind entry)
  router.tsx              # TanStack router setup
```

---

## Out of Scope for MVP

- Character-level completion tracking for Long scenarios
- Return of the King chapter data
- LOTR visual theming
- PWA / home screen install
- Statistics or history views
