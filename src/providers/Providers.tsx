import { FC, PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';

import { QueryProvider } from './QueryProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <HashRouter>
    <QueryProvider>{children}</QueryProvider>
  </HashRouter>
);
