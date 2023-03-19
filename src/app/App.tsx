import { Route, Routes } from 'react-router-dom';

import { Header, Main, Search } from '@/containers';

import styles from './App.module.css';

export const App = () => (
  <Routes>
    <Route
      element={
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Header />
            <Search />
            <Routes>
              <Route element={<Main />} index />
              <Route element={<Main />} path="/:chatId" />
              <Route element={<Main />} path="/:chatId/:messageId" />
            </Routes>
          </div>
        </div>
      }
      path="*"
    />
  </Routes>
);
