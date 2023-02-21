import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Header, Search } from '@containers';
import { store } from '@store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomePage } from './pages/Home';

import 'styles/styles.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <div className="wrapper">
              <Header />
              <Search />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:chatId" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
