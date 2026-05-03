export type VictoryCondition = 'short' | 'long';

export type Character = {
  name: string;
  required: boolean;
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
