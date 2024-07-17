'use client';

import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { CharacterCard } from '@/components/character-card';
import { PaginationGroup } from '@/components/pagination-group';
import { GET_CHARACTERS } from '@/services/character';

import type { Character } from '@/types/character';

const Characters = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') || '1');

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
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
        <h4 className="text-lg font-bold">
          Teleporting to another dimension...
        </h4>
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
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.characters.results.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <PaginationGroup
        page={page}
        totalPage={data.characters.info.pages}
        hasMore={Boolean(data.characters.info.next)}
        pathname="/"
        searchParams={Object.fromEntries(searchParams)}
      />
    </>
  );
};

export default Characters;
