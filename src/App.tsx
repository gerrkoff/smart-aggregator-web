import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Header, Search, Main } from '@containers';
import { store } from '@store/store';
import { useApi } from '@hooks/useApi';

export const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper/>
    </Provider>
  );
};

const AppWrapper = () => {
  const { dispatchChats, dispatchMessages } = useApi();

  useEffect(() => {
    dispatchChats();
    dispatchMessages();
  }, [])

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header/>
        <Search/>
        <Main/>
      </div>
    </div>
  )
}
