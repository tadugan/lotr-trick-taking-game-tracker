# MVP Requirements

## Overview

A mobile-first React web app for tracking progress through the Lord of the Rings Trick-Taking Game trilogy. A single user tracks one or more save files, each representing a group's playthrough of a specific game.

---

## Supported Games

| Game | Chapters | Status |
|---|---|---|
| The Fellowship of the Ring | 1–18 | Supported |
| The Two Towers | 19–35 | Supported |
| The Return of the King | TBD | Not yet released — placeholder only |

---

## Core Concepts

### Chapter
Each game consists of numbered chapters played sequentially (though players may play in any order). Each chapter has:
- A number and name
- A list of available characters (some marked **required**)
- A victory condition type: **Short** or **Long**
  - **Short**: completed in a single hand — track completed yes/no
  - **Long**: completed over multiple hands — track completed yes/no (character-level tracking is a stretch goal)

### Save File
Represents one group's playthrough of one game. A user may have multiple save files per game (e.g., replaying with a different group). Each save file stores:
- A user-defined name
- The associated game
- Per-chapter completion status

---

## Features

### Save File Management
- Create a new save file, choosing a game and entering a custom name
- View a list of all save files, grouped or filtered by game
- Delete a save file (with confirmation)
- Rename a save file

### Chapter Tracking
- View all chapters for a save file in order (1–18 or 19–35)
- See each chapter's name, number, victory condition type (Short/Long), and character list
- Toggle a chapter as completed or not completed
- Visual progress indicator showing how many chapters are complete out of total

### Data Persistence
- All data stored in **localStorage** on the user's device
- No accounts, no backend, no network required

### Data Portability
- **Export** a save file as a JSON file (download to device)
- **Import** a save file from a previously exported JSON file
- This serves as both backup and a way to move saves between devices/browsers

### Return of the King Placeholder
- The third game is listed in the UI as "Coming Soon" and cannot have save files created for it until chapter data is available

---

## Design

- Mobile-first responsive layout
- Clean, minimalist aesthetic
- No heavy theming for MVP — simple and functional
