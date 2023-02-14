import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Header, Search, Main } from '@containers';
import { store } from '@store/store';
import { useApi } from '@hooks/useApi';
import { useFeedSelector } from '@store/feed';
import { useGroupsSelector } from '@store/groups';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'styles/styles.scss';

const Home = () => {
  const { dispatchGroups, dispatchFeed } = useApi();
  const { feed } = useFeedSelector();
  const { groups } = useGroupsSelector();

  useEffect(() => {
    dispatchGroups();
    dispatchFeed();
  }, []);

  return <Main groups={groups} feed={feed} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <div className="wrapper">
            <Header />
            <Search />
            <Routes>
              <Route path="/" element={<Home />} />
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
