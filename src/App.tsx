import React from 'react';
import { Header, Search, Main } from '@containers';
import { useApi } from '@hooks/useApi';

export const App = () => {
  const { messages, chats } = useApi();

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header/>
        <Search/>
        <Main chats={chats} messages={messages}/>
      </div>
    </div>
  );
};
