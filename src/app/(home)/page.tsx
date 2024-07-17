import { Suspense } from 'react';

import Characters from './characters';

const Home = async () => {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Characters</h1>
        <p className="text-muted-foreground">
          Get to know your favorite characters from the show.
        </p>
      </div>
      <Suspense>
        <Characters />
      </Suspense>
    </section>
  );
};

export default Home;
