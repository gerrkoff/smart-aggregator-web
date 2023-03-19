import { Route, Routes } from 'react-router-dom';

import { Header, Main, Search } from '@/containers';

import css from './App.module.css';

export const App = () => (
  <Routes>
    <Route
      path="*"
      element={
        <div className={css.container}>
          <div className={css.wrapper}>
            <Header />
            <Search />
            <Routes>
              <Route index element={<Main />} />
              <Route path="/:chatId" element={<Main />} />
              <Route path="/:chatId/:messageId" element={<Main />} />
            </Routes>
          </div>
        </div>
      }
    />
  </Routes>
);
