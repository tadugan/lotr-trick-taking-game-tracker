export type VictoryCondition = 'short' | 'long';

export type Character = {
  name: string;
  required: boolean;            // * marker: bold/dark chip styling
  countsForCompletion: boolean; // false for ? marker: checkbox present but won't auto-complete chapter
};

export type Chapter = {
  number: number;
  name: string;
  victoryCondition: VictoryCondition;
  characters: Character[];
};

export type Game = {
  id: 'fotr' | 'tt' | 'rotk';
  title: string;
  chapters: Chapter[];
  released: boolean;
};

export type ChapterProgress = {
  chapterNumber: number;
  completed: boolean;
  characterProgress?: Record<string, boolean>; // only populated for 'long' chapters
};

export type SaveFile = {
  id: string;
  gameId: 'fotr' | 'tt' | 'rotk';
  name: string;
  players: string[];
  createdAt: string;
  updatedAt: string;
  chapters: ChapterProgress[];
};
