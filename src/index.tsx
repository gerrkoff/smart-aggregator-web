import './styles';

import { createRoot } from 'react-dom/client';

import { App } from './app';
import { Providers } from './providers';

const roorElement = document.getElementById('root');

if (roorElement) {
  createRoot(roorElement).render(
    <Providers>
      <App />
    </Providers>,
  );
}
