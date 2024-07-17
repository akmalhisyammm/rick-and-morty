import { APP_NAME, APP_URL } from '@/constants/app';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Character from './character';

import type { Metadata } from 'next';

type CharacterDetailProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: CharacterDetailProps): Promise<Metadata> => ({
  title: `Character ${params.id}`,
  alternates: {
    canonical: `/characters/${params.id}`,
  },
  openGraph: {
    title: `Character ${params.id} | ${APP_NAME}`,
    url: `${APP_URL}/characters/${params.id}`,
  },
});

const CharacterDetail = ({ params }: CharacterDetailProps) => {
  const id = Number(params.id);

  return (
    <>
      <section>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Character {id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="space-y-4">
        <Character id={id} />
      </section>
    </>
  );
};

export default CharacterDetail;
