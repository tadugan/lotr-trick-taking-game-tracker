# Stretch Goals

Enhancements to consider after MVP is complete, roughly ordered by value.

---

## Player Names ✓ Implemented
When creating a save file, optionally enter the names of up to 4 players in the group. Player names are displayed on the save card on the home page and on the save detail page.

- Up to 4 player name inputs, each removable
- Names are optional — saves work fine without them
- Blank entries are ignored on save

---

## Long Scenario Character Tracking
For chapters with a **Long** victory condition, allow tracking which individual characters have had their objectives completed so far. This gives players a way to record partial progress mid-campaign on a multi-session scenario.

- Per-character completion checkboxes within a chapter
- Visual indicator showing how many characters are done vs. total
- Chapter marked "complete" only when all characters are done (or user manually marks it complete)

---

## Return of the King Support
Add full chapter data for the third game once it is released.

- Same structure as the first two games
- Save files can be created for it immediately upon data entry

---

## LOTR Visual Theme
Enhance the visual design to feel more in-universe.

- Thematic color palette, typography, and iconography
- Potential use of chapter/game artwork if licensing allows
- Dark mode with a parchment/aged aesthetic

---

## Completion Statistics
Display aggregate stats per save file or across all saves:

- Percentage of chapters completed
- Total chapters completed across all games
- Optionally: a timeline or date-stamped completion history

---

## Chapter Notes
Allow players to add a freeform text note to any chapter (e.g., memorable moments, strategy tips, group composition).

---

## Session Log / Dates
Optionally record the date a chapter was marked complete, enabling a history/timeline view.

---

## Online Deployment
Deploy the app to a public URL so it's accessible from any device without running a local dev server.

- Host on a static/edge platform — good candidates: **Vercel**, **Netlify**, or **Cloudflare Pages** (all have free tiers and support TanStack Start)
- No backend required — all data stays in the user's browser localStorage
- A public URL also makes it easy to share with other players in the group

---

## PWA Support
Make the app installable as a Progressive Web App so it can be added to a phone's home screen and used offline like a native app. Given the mobile-first, offline-by-design nature of this app, this is a strong candidate to implement shortly after MVP — setup cost is low with `vite-plugin-pwa`.
