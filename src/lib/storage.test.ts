import { describe, it, expect, beforeEach } from 'vitest';
import { loadSaves, saveSaves, createSave, updateSave, deleteSave, getSave } from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('loadSaves', () => {
  it('returns empty array when nothing is stored', () => {
    expect(loadSaves()).toEqual([]);
  });

  it('returns empty array when stored value is invalid JSON', () => {
    localStorage.setItem('lotr-tracker:saves', 'not-json');
    expect(loadSaves()).toEqual([]);
  });
});

describe('saveSaves / loadSaves round-trip', () => {
  it('persists and retrieves saves', () => {
    const save = createSave('fotr', 'My Fellowship Run');
    const loaded = loadSaves();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].name).toBe('My Fellowship Run');
    expect(loaded[0].gameId).toBe('fotr');
  });
});

describe('createSave', () => {
  it('generates a unique id', () => {
    const a = createSave('fotr', 'Run A');
    const b = createSave('fotr', 'Run B');
    expect(a.id).not.toBe(b.id);
  });

  it('initializes all chapters as not completed', () => {
    const save = createSave('fotr', 'Test');
    expect(save.chapters.every((c) => c.completed === false)).toBe(true);
  });

  it('creates the correct number of chapters for fotr', () => {
    const save = createSave('fotr', 'Test');
    expect(save.chapters).toHaveLength(20);
    expect(save.chapters[0].chapterNumber).toBe(1);
    expect(save.chapters[19].chapterNumber).toBe(18.2);
  });

  it('creates the correct number of chapters for tt', () => {
    const save = createSave('tt', 'Test');
    expect(save.chapters).toHaveLength(18);
    expect(save.chapters[0].chapterNumber).toBe(19);
    expect(save.chapters[17].chapterNumber).toBe(36);
  });

  it('initializes characterProgress for long chapters', () => {
    const save = createSave('fotr', 'Test');
    const ch9 = save.chapters.find((c) => c.chapterNumber === 9)!;
    expect(ch9.characterProgress).toBeDefined();
    expect(ch9.characterProgress!['Glorfindel']).toBe(false);
    expect(ch9.characterProgress!['Frodo']).toBe(false);
  });

  it('does not add characterProgress for short chapters', () => {
    const save = createSave('fotr', 'Test');
    const ch1 = save.chapters.find((c) => c.chapterNumber === 1)!;
    expect(ch1.characterProgress).toBeUndefined();
  });

  it('creates zero chapters for unreleased rotk', () => {
    const save = createSave('rotk', 'Test');
    expect(save.chapters).toHaveLength(0);
  });

  it('trims whitespace from name', () => {
    const save = createSave('fotr', '  Padded Name  ');
    expect(save.name).toBe('Padded Name');
  });

  it('defaults to empty players array when none provided', () => {
    const save = createSave('fotr', 'Test');
    expect(save.players).toEqual([]);
  });

  it('stores trimmed non-empty player names', () => {
    const save = createSave('fotr', 'Test', ['  Frodo  ', 'Sam', '']);
    expect(save.players).toEqual(['Frodo', 'Sam']);
  });

  it('filters out blank player names', () => {
    const save = createSave('fotr', 'Test', ['', '  ', 'Gandalf']);
    expect(save.players).toEqual(['Gandalf']);
  });
});

describe('updateSave', () => {
  it('updates a save in place and refreshes updatedAt', async () => {
    const save = createSave('fotr', 'Original');
    const originalUpdatedAt = save.updatedAt;

    await new Promise((r) => setTimeout(r, 5));

    updateSave({ ...save, name: 'Renamed' });
    const loaded = getSave(save.id);

    expect(loaded?.name).toBe('Renamed');
    expect(loaded?.updatedAt).not.toBe(originalUpdatedAt);
  });

  it('does not affect other saves', () => {
    const a = createSave('fotr', 'Save A');
    const b = createSave('tt', 'Save B');
    updateSave({ ...a, name: 'Save A Renamed' });
    expect(getSave(b.id)?.name).toBe('Save B');
  });
});

describe('deleteSave', () => {
  it('removes the save by id', () => {
    const save = createSave('fotr', 'To Delete');
    deleteSave(save.id);
    expect(getSave(save.id)).toBeUndefined();
  });

  it('does not affect other saves', () => {
    const a = createSave('fotr', 'Keep');
    const b = createSave('tt', 'Delete');
    deleteSave(b.id);
    expect(getSave(a.id)).toBeDefined();
    expect(loadSaves()).toHaveLength(1);
  });
});

describe('getSave', () => {
  it('returns undefined for unknown id', () => {
    expect(getSave('nonexistent-id')).toBeUndefined();
  });

  it('returns the correct save by id', () => {
    const save = createSave('tt', 'Find Me');
    expect(getSave(save.id)?.name).toBe('Find Me');
  });
});
