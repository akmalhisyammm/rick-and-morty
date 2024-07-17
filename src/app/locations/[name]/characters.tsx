'use client';

import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import Image from 'next/image';

import { LocationContext } from '@/contexts/location';
import { CharacterCard } from '@/components/character-card';
import { GET_CHARACTERS_BY_IDS } from '@/services/character';

import type { Character } from '@/types/character';

type CharactersProps = {
  location: string;
};

const Characters = ({ location }: CharactersProps) => {
  const { getCharactersByLocation } = useContext(LocationContext);

  const { data, loading, error } = useQuery(GET_CHARACTERS_BY_IDS, {
    variables: {
      ids: getCharactersByLocation(location),
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
        <Image
          src="/portal.gif"
          alt="Loading..."
          sizes="100%"
          width={250}
          height={250}
          unoptimized
        />
        <h4 className="text-lg font-bold">Teleporting to {location}...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <h4 className="text-lg font-bold">
        Failed to teleport, try again later.
      </h4>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.charactersByIds.map((character: Character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default Characters;
