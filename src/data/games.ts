import type { Character, Game } from '../types';

const r = (name: string): Character => ({ name, required: true, countsForCompletion: true });
const o = (name: string): Character => ({ name, required: false, countsForCompletion: true });
const b = (name: string): Character => ({ name, required: false, countsForCompletion: false }); // ? marker

export const GAMES: Game[] = [
  {
    id: 'fotr',
    title: 'The Fellowship of the Ring',
    released: true,
    chapters: [
      {
        number: 1,
        name: 'A Long-expected Party',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Bilbo'), o('Gandalf'), o('Pippin')],
      },
      {
        number: 2,
        name: 'A Little Delay on the Shire',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Sam'), r('Merry'), o('Gandalf'), o('Pippin')],
      },
      {
        number: 3,
        name: 'The Ring Sets Out',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Farmer Maggot'), r('Gildor Inglorian'), o('Sam'), o('Merry'), o('Pippin')],
      },
      {
        number: 4,
        name: 'Conspiracy in Crickhollow',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Fatty Bolger'), o('Sam'), r('Merry'), o('Pippin')],
      },
      {
        number: 5,
        name: 'The Old Forest',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Tom Bombadil'), o('Sam'), o('Merry'), o('Pippin')],
      },
      {
        number: 6,
        name: 'Fog on the Barrow-downs',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Tom Bombadil'), r('Goldberry'), o('Sam'), o('Merry'), o('Pippin')],
      },
      {
        number: 7,
        name: 'At the Sign of the Prancing Pony',
        victoryCondition: 'short',
        characters: [r('Mr. Underhill'), r('Barlimann Butterbur'), o('Sam'), o('Merry'), o('Pippin')],
      },
      {
        number: 8,
        name: 'A Knife in the Dark',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Merry'), r('Strider'), o('Sam'), o('Pippin'), o('Barlimann Butterbur')],
      },
      {
        number: 9,
        name: 'Fight to the Ford',
        victoryCondition: 'long',
        characters: [r('Glorfindel'), o('Frodo'), o('Sam'), o('Merry'), o('Pippin'), o('Strider'), o('Bill the Pony')],
      },
      {
        number: 10,
        name: 'Recovery in Rivendell',
        victoryCondition: 'short',
        characters: [r('Elrond'), r('Bilbo Baggins'), o('Gloin'), o('Arwen'), o('Gandalf')],
      },
      {
        number: 11,
        name: 'The Council of Elrond',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Aragorn'), r('Boromir'), o('Gloin'), o('Bilbo Baggins')],
      },
      {
        number: 12,
        name: 'Delayed in Isengard',
        victoryCondition: 'short',
        characters: [r('Gandalf'), o('Radagast'), o('Shadowfax'), o('Gwaihir')],
      },
      {
        number: 13,
        name: 'The Ring Goes South',
        victoryCondition: 'long',
        characters: [r('Frodo'), o('Gandalf'), o('Aragorn'), o('Legolas'), o('Gimli'), o('Boromir'), o('Sam'), o('Merry'), o('Pippin'), o('Bill the Pony')],
      },
      {
        number: 14,
        name: 'The Mines of Moria',
        victoryCondition: 'long',
        characters: [r('Frodo'), o('Gandalf'), o('Aragorn'), o('Legolas'), o('Gimli'), o('Boromir'), o('Sam'), o('Merry'), o('Pippin')],
      },
      {
        number: 15,
        name: 'The Leaves of Lothlorien',
        victoryCondition: 'short',
        characters: [r('Gimli'), r('Haldir'), r('Orophin & Rumil'), o('Legolas')],
      },
      {
        number: 16,
        name: 'Mirror of Galadriel',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Galadriel'), r('Celeborn'), o('Sam')],
      },
      {
        number: 16.5,
        name: 'The Gifts of Galadriel',
        victoryCondition: 'long',
        characters: [r('Frodo'), o('Aragorn'), o('Legolas'), o('Gimli'), o('Boromir'), o('Sam'), o('Merry'), o('Pippin'), o('Galadriel'), b('Celeborn')],
      },
      {
        number: 17,
        name: 'The Great River',
        victoryCondition: 'long',
        characters: [r('Frodo'), o('Aragorn'), o('Legolas'), o('Gimli'), o('Boromir'), o('Sam'), o('Merry'), o('Pippin'), o('Galadriel'), b('Celeborn')],
      },
      {
        number: 18.1,
        name: 'The Breaking of the Fellowship (Group 1)',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Boromir son of Denethor'), o('Samwise Gamgee'), o('Aragorn son of Arathorn')],
      },
      {
        number: 18.2,
        name: 'The Breaking of the Fellowship (Group 2)',
        victoryCondition: 'short',
        characters: [r('Meriadoc Brandybuck'), r('Peregrin Took'), o('Legolas Greenleaf'), o('Gimli son of Gloin')],
      },
    ],
  },
  {
    id: 'tt',
    title: 'The Two Towers',
    released: true,
    chapters: [
      {
        number: 19,
        name: 'The Departure of Boromir',
        victoryCondition: 'short',
        characters: [r('Aragorn'), r('Boromir'), o('Legolas'), o('Gimli')],
      },
      {
        number: 20,
        name: 'The Riders of Rohan',
        victoryCondition: 'short',
        characters: [r('Aragorn'), r('Eomer'), o('Gimli'), o('Legolas')],
      },
      {
        number: 21,
        name: 'The Uruk-hai',
        victoryCondition: 'short',
        characters: [r('Grishnakh'), r('Ugluk'), r('Merry'), o('Pippin')],
      },
      {
        number: 22,
        name: 'Fangorn',
        victoryCondition: 'short',
        characters: [r('Treebeard'), r('Quickbeam'), o('Merry'), o('Pippin')],
      },
      {
        number: 23,
        name: 'The White Rider',
        victoryCondition: 'short',
        characters: [r('Old Man in White'), r('Old Man in White'), r('Aragorn'), o('Gimli'), o('Legolas')],
      },
      {
        number: 24,
        name: 'The King in the Golden Hall',
        victoryCondition: 'short',
        characters: [r('Gandalf the White'), r('Theoden'), r('Eowyn'), o('Eomer')],
      },
      {
        number: 25,
        name: "Helm's Deep",
        victoryCondition: 'long',
        characters: [r('Aragorn (Leader of Men)'), o('Theoden'), o('Gimli (Competitor)'), o('Legolas (Competitor)'), o('Hama'), o('Erkenbrand'), o('Gamling the Old'), o('Eomer'), o('Gandalf the White')],
      },
      {
        number: 26,
        name: 'The Drowning of Isengard',
        victoryCondition: 'short',
        characters: [r('Treebeard'), r('Beechbone'), r('Quickbeam'), o('Saruman')],
      },
      {
        number: 27,
        name: 'The Voice of Saruman',
        victoryCondition: 'short',
        characters: [r('Saruman'), r('Gandalf the White'), o('Theoden'), o('Eomer'), o('Legolas (Hunter)'), o('Gimli (Hunter)')],
      },
      {
        number: 28,
        name: 'The Palantir',
        victoryCondition: 'short',
        characters: [r('Gandalf the White'), r('Pippin'), r('Shadowfax'), o('Merry')],
      },
      {
        number: 29,
        name: 'The Taming of Gollum',
        victoryCondition: 'short',
        characters: [r('Frodo'), o('Sam'), r('Gollum (Stinker)'), r('Smeagol (Slinker)')],
      },
      {
        number: 30,
        name: 'The Passage of the Marshes',
        victoryCondition: 'short',
        characters: [r('Frodo'), o('Sam'), r('Gollum (Stinker)'), r('Smeagol (Sworn to the Precious)')],
      },
      {
        number: 31,
        name: 'The Black Gate',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Sam'), r('Gollum (Wicked)'), o('Smeagol (Sworn to the Precious)')],
      },
      {
        number: 32,
        name: 'The Window to the West',
        victoryCondition: 'long',
        characters: [r('Frodo'), o('Sam'), o('Faramir'), o('Boromir'), o('Smeagol (Sworn to the Precious)'), o('Smeagol (Wretched)'), o('Gollum (Wicked)')],
      },
      {
        number: 33,
        name: 'The Stairs of Cirith Ungol',
        victoryCondition: 'short',
        characters: [r('Frodo'), o('Sam'), r('Smeagol (Wretched)'), o('Gollum (Wicked)')],
      },
      {
        number: 34,
        name: "Shelob's Lair",
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Sam'), o('Smeagol (Wretched)'), r('Gollum (Servant of the Precious)')],
      },
      {
        number: 35,
        name: 'Shelob',
        victoryCondition: 'short',
        characters: [r('Frodo'), r('Sam'), r('Shelob'), o('Gollum (Friend of Shelob)')],
      },
      {
        number: 36,
        name: 'The Choices of Master Samewise',
        victoryCondition: 'short',
        characters: [r('Sam (Ring-bearer)'), r('Frodo (Stung by Shelob)'), r('Gorbag'), o('Shagrat')],
      },
    ],
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
