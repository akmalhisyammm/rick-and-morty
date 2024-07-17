import Link from 'next/link';

import { APP_AUTHOR } from '@/constants/app';

export const Footer = () => {
  return (
    <footer className="container px-4 py-8 mx-auto md:px-6">
      <p className="text-center">
        &copy; {new Date().getFullYear()} &bull;{' '}
        <Link
          href="https://akmalhisyam.my.id"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {APP_AUTHOR}
        </Link>
      </p>
    </footer>
  );
};
