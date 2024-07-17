import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  APP_AUTHOR,
} from '@/constants/app';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import Providers from '@/app/providers';

import type { Metadata } from 'next';

type RootLayoutProps = {
  children: React.ReactNode;
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: 'website',
  },
  twitter: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
    creator: '@akmalhisyammm',
  },
  authors: {
    name: APP_AUTHOR,
    url: APP_URL,
  },
  keywords: ['rick and morty', 'character', 'episode', 'location'],
  creator: APP_AUTHOR,
  publisher: APP_AUTHOR,
  generator: 'Next.js',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <NextTopLoader color="#4078c0" showSpinner={false} />
          <Header />
          <main className="container p-4 mx-auto space-y-4 md:px-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
