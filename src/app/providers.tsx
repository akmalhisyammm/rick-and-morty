'use client';

import { ApolloProvider } from '@apollo/client';

import { LocationProvider } from '@/contexts/location';
import { ThemeProvider } from '@/components/theme-provider';
import { client } from '@/lib/apollo';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LocationProvider>{children}</LocationProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
