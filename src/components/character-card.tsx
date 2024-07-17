import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { Character } from '@/types/character';

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Link
      key={character.id}
      href={`/characters/${character.id}`}
      legacyBehavior
      passHref
    >
      <Card className="cursor-pointer hover:scale-[1.02] hover:animate-in">
        <CardHeader className="p-4">
          <figure className="relative w-full overflow-hidden h-60 rounded-md">
            <Image
              src={character.image}
              alt={character.name}
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
        </CardHeader>
        <CardContent className="px-4 space-y-2">
          <Badge
            className={cn(
              'capitalize',
              character.status === 'Alive' &&
                'bg-green-600 hover:bg-green-600/80 dark:bg-green-300 dark:hover:bg-green-300/80',
              character.status === 'Dead' &&
                'bg-red-600 hover:bg-red-600/80 dark:bg-red-300 dark:hover:bg-red-300/80',
              character.status === 'unknown' &&
                'bg-slate-600 hover:bg-slate-600/80 dark:bg-slate-300 dark:hover:bg-slate-300/80',
            )}
          >
            {character.status}
          </Badge>
          <CardTitle>{character.name}</CardTitle>
          <CardDescription>
            A <b>{character.species.toLowerCase()}</b> with{' '}
            <b>{character.gender.toLowerCase()}</b> gender.
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
