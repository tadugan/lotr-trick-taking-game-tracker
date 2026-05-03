import type { SaveFile } from '../types';
import { loadSaves, saveSaves } from './storage';

export function exportSave(save: SaveFile): void {
  const json = JSON.stringify(save, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${save.name.replace(/[^a-z0-9]/gi, '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export type ImportResult =
  | { ok: true; save: SaveFile }
  | { ok: false; error: string };

export async function importSaveFromFile(file: File): Promise<ImportResult> {
  let raw: string;
  try {
    raw = await file.text();
  } catch {
    return { ok: false, error: 'Could not read the file.' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'File is not valid JSON.' };
  }

  if (!isValidSaveFile(parsed)) {
    return { ok: false, error: 'File does not look like a valid save file.' };
  }

  // Assign a new UUID so it never collides with an existing save
  const imported: SaveFile = {
    ...parsed,
    id: crypto.randomUUID(),
    players: parsed.players ?? [],
  };

  const saves = loadSaves();
  saveSaves([...saves, imported]);
  return { ok: true, save: imported };
}

function isValidSaveFile(v: unknown): v is SaveFile {
  if (!v || typeof v !== 'object') return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.id === 'string' &&
    (s.gameId === 'fotr' || s.gameId === 'tt' || s.gameId === 'rotk') &&
    typeof s.name === 'string' &&
    s.name.trim().length > 0 &&
    typeof s.createdAt === 'string' &&
    typeof s.updatedAt === 'string' &&
    Array.isArray(s.chapters) &&
    s.chapters.every(
      (c) =>
        c &&
        typeof c === 'object' &&
        typeof (c as Record<string, unknown>).chapterNumber === 'number' &&
        typeof (c as Record<string, unknown>).completed === 'boolean',
    )
  );
}
