import { APP_NAME, APP_URL } from '@/constants/app';
import Characters from './characters';

import type { Metadata } from 'next';

type LocationDetailProps = {
  params: {
    name: string;
  };
};

export const generateMetadata = async ({
  params,
}: LocationDetailProps): Promise<Metadata> => ({
  title: params.name,
  alternates: {
    canonical: `/locations/${params.name}`,
  },
  openGraph: {
    title: `${params.name} | ${APP_NAME}`,
    url: `${APP_URL}/locations/${params.name}`,
  },
});

const LocationDetail = ({ params }: LocationDetailProps) => {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{params.name}</h1>
        <p className="text-muted-foreground">
          List of characters that are assigned to {params.name}.
        </p>
      </div>
      <Characters location={params.name} />
    </section>
  );
};

export default LocationDetail;
