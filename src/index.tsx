import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Header, Search, Main } from '@containers';
import { store } from '@store/store';
import { useApi } from '@hooks/useApi';
import { useFeedSelector } from '@store/feed';
import { useGroupsSelector } from '@store/groups';

import 'styles/styles.scss';

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper/>
    </Provider>
  );
};

const AppWrapper = () => {
  const { dispatchGroups, dispatchFeed } = useApi();
  const { feed } = useFeedSelector();
  const { groups } = useGroupsSelector();

  useEffect(() => {
    dispatchGroups();
    dispatchFeed();
  }, [])

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header/>
        <Search/>
        <Main groups={groups} feed={feed}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
