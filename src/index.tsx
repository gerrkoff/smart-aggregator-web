import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Header, Search } from '@containers';
import { store } from '@store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';

import 'styles/styles.scss';
import { ChatPage } from './pages/ChatPage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <div className="wrapper">
            <Header />
            <Search />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:chatId" element={<HomePage />} />
              <Route path="/:chatId/:feedId" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
