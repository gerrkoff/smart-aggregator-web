import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '@/store/store';

import { QueryProvider } from './QueryProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <HashRouter>
    <QueryProvider>
      <Provider store={store}>{children}</Provider>
    </QueryProvider>
  </HashRouter>
);
