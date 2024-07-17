import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-sm bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link href="/">
          <Image src="/logo.png" alt="Rick and Morty" width={113} height={32} />
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
