'use client';

import { useEffect, useState } from 'react';

import { LocationContext } from './LocationContext';

type LocationProviderProps = {
  children: React.ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<{
    [key: string]: number[];
  }>({});

  const assignCharacterToLocation = (name: string, characterId: number) => {
    const newLocation = name.toLowerCase();

    if (!location[newLocation]) {
      location[newLocation] = [];
    }

    if (!location[newLocation].includes(characterId)) {
      for (const key in location) {
        if (location[key].includes(characterId)) {
          location[key] = location[key].filter((item) => item !== characterId);
          break;
        }
      }

      location[newLocation].push(characterId);
      localStorage.setItem('location', JSON.stringify(location));
      return true;
    }

    return false;
  };

  const getLocationByCharacterId = (characterId: number) => {
    for (const key in location) {
      if (location[key].includes(characterId)) {
        return key;
      }
    }

    return null;
  };

  const getCharactersByLocation = (name: string) => {
    return location[name.toLowerCase()] || [];
  };

  useEffect(() => {
    const locationStorage = localStorage.getItem('location');

    if (locationStorage) {
      setLocation(JSON.parse(locationStorage));
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        assignCharacterToLocation,
        getLocationByCharacterId,
        getCharactersByLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
