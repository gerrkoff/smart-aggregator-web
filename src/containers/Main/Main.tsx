import React from 'react';
import { Chats, Messages, Comments } from '@containers/Main';

import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.main}>
      <Chats />
      <Messages />
      <Comments/>
    </div>
  )
}
