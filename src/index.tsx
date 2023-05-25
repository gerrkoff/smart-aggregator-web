import './styles';

import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';

import { App } from './app';
import { Providers } from './providers';

const roorElement = document.getElementById('root');

if (roorElement) {
  createRoot(roorElement).render(
    <Providers>
      <Helmet>
        <meta
          content="сервис получения актуальных новостей и мнений из разных источников со всего мира"
          name="description"
        />
        <meta content="свежие новости, мнения, инсайты, телеграмм, телеграмм новости" name="keywords" />
      </Helmet>

      <App />
    </Providers>,
  );
}
