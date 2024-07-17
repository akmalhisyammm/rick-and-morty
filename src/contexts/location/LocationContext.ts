import { createContext } from 'react';

type Context = {
  location: { [key: string]: number[] };
  assignCharacterToLocation: (name: string, characterId: number) => boolean;
  getLocationByCharacterId: (characterId: number) => string | null;
  getCharactersByLocation: (name: string) => number[];
};

export const LocationContext = createContext<Context>({
  location: {},
  assignCharacterToLocation: () => false,
  getLocationByCharacterId: () => null,
  getCharactersByLocation: () => [],
});
