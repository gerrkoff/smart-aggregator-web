import { FC, PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { QueryProvider } from './QueryProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <HelmetProvider>
    <QueryProvider>{children}</QueryProvider>
  </HelmetProvider>
);
