import React from 'react';
import { Chats, Messages, Comments } from '@containers/Main';

import styles from './Main.module.scss';

export const Main = ({chats, messages}) => {
  return (
    <div className={styles.main}>
      <Chats chats={chats}/>
      <Messages messages={messages}/>
      <Comments/>
    </div>
  )
}
