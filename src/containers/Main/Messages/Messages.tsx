import React from 'react';
import { Message, TMessage } from '@components';
import { getMessageLastTime } from '@utils/utils';

import styles from './Messages.module.scss';

export const Messages = ({ messages }) => {
  return (
    <div className={styles.messages}>
      <div className={styles.messages__layout} id='messages'>
        {messages
          ?.sort((a, b) => getMessageLastTime(b) - getMessageLastTime(a))
          ?.map((message: TMessage) =>
          <Message {...message} key={`${message.CreateTime}-${message.MessageId}`}/>)
        }
      </div>
    </div>
  )
}
