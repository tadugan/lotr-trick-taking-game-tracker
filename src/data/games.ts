import type { Game } from '../types';

const PLACEHOLDER_CHARACTERS = [
  { name: 'Bilbo', required: false },
  { name: 'Samwise', required: false },
  { name: 'Strider', required: false },
  { name: 'Gandalf', required: false },
];

function placeholderChapters(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    number: start + i,
    name: `Chapter ${start + i}`,
    victoryCondition: 'short' as const,
    characters: PLACEHOLDER_CHARACTERS,
  }));
}

export const GAMES: Game[] = [
  {
    id: 'fotr',
    title: 'The Fellowship of the Ring',
    released: true,
    chapters: placeholderChapters(1, 18),
  },
  {
    id: 'tt',
    title: 'The Two Towers',
    released: true,
    chapters: placeholderChapters(19, 35),
  },
  {
    id: 'rotk',
    title: 'The Return of the King',
    released: false,
    chapters: [],
  },
];

export function getGame(id: Game['id']): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
