import type { SaveFile, ChapterProgress } from '../types';
import { getGame } from '../data/games';

const STORAGE_KEY = 'lotr-tracker:saves';

export function loadSaves(): SaveFile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SaveFile[];
  } catch {
    return [];
  }
}

export function saveSaves(saves: SaveFile[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
}

export function createSave(
  gameId: SaveFile['gameId'],
  name: string,
  players: string[] = [],
): SaveFile {
  const game = getGame(gameId);
  const chapters: ChapterProgress[] = (game?.chapters ?? []).map((ch) => ({
    chapterNumber: ch.number,
    completed: false,
    ...(ch.victoryCondition === 'long'
      ? { characterProgress: Object.fromEntries(ch.characters.map((c) => [c.name, false])) }
      : {}),
  }));

  const now = new Date().toISOString();
  const save: SaveFile = {
    id: crypto.randomUUID(),
    gameId,
    name: name.trim(),
    players: players.map((p) => p.trim()).filter(Boolean),
    createdAt: now,
    updatedAt: now,
    chapters,
  };

  const saves = loadSaves();
  saveSaves([...saves, save]);
  return save;
}

export function updateSave(updated: SaveFile): void {
  const saves = loadSaves();
  saveSaves(
    saves.map((s) =>
      s.id === updated.id
        ? { ...updated, updatedAt: new Date().toISOString() }
        : s,
    ),
  );
}

export function deleteSave(id: string): void {
  saveSaves(loadSaves().filter((s) => s.id !== id));
}

export function getSave(id: string): SaveFile | undefined {
  return loadSaves().find((s) => s.id === id);
}
