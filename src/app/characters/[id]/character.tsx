'use client';

import { useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LocationContext } from '@/contexts/location';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GET_CHARACTER } from '@/services/character';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import LocationForm from './location-form';

type CharacterProps = {
  id: number;
};

const Character = ({ id }: CharacterProps) => {
  const [isAssigning, setIsAssigning] = useState<boolean>(false);

  const { getLocationByCharacterId } = useContext(LocationContext);

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {
      id,
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
        <h4 className="text-lg font-bold">Teleporting to character {id}...</h4>
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

  const location = getLocationByCharacterId(id);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{data.character.name}</h1>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <figure className="relative w-full overflow-hidden sm:max-w-80 h-80 rounded-lg">
          <Image
            src={data.character.image}
            alt={data.character.name}
            sizes="100%"
            fill
            priority
            className="object-cover"
          />
        </figure>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold">Status</h4>
            <Badge
              className={cn(
                'capitalize',
                data.character.status === 'Alive' &&
                  'bg-green-600 hover:bg-green-600/80 dark:bg-green-300 dark:hover:bg-green-300/80',
                data.character.status === 'Dead' &&
                  'bg-red-600 hover:bg-red-600/80 dark:bg-red-300 dark:hover:bg-red-300/80',
                data.character.status === 'unknown' &&
                  'bg-slate-600 hover:bg-slate-600/80 dark:bg-slate-300 dark:hover:bg-slate-300/80',
              )}
            >
              {data.character.status}
            </Badge>
          </div>
          <div>
            <h4 className="text-lg font-bold">Species</h4>
            <p>{data.character.species}</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Gender</h4>
            <p>{data.character.gender}</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Location</h4>
            {location ? (
              <Link
                href={`/locations/${location}`}
                className="flex gap-1 items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                {location}
                <SquareArrowOutUpRight className="w-4 h-4" />
              </Link>
            ) : (
              <p className="text-muted-foreground">
                Not assigned to any location
              </p>
            )}
          </div>
          <Dialog open={isAssigning} onOpenChange={setIsAssigning}>
            <DialogTrigger asChild>
              <Button>Assign New Location</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Character to Location</DialogTitle>
                <DialogDescription>
                  Enter the location name to assign the character there.
                </DialogDescription>
              </DialogHeader>
              <LocationForm
                characterId={id}
                onDismiss={() => setIsAssigning(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Character;
