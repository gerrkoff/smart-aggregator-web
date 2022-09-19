import React from 'react';
import { useActiveMessageSelector } from '@store/activeMessage';
import { useMessagesSelector } from '@store/messages';
import { MessageFull } from '@components';

import styles from './Comments.module.scss';

export const Comments = () => {
  const { data } = useMessagesSelector();
  const { messageId } = useActiveMessageSelector();

  const dataToFullMessageElement = () => {
    let fullMessage;

    if (messageId) {
      fullMessage = data?.filter((message) => String(message.id) === String(messageId))[0];
    }

    return fullMessage ? <MessageFull message={fullMessage}/> : null;
  }

  return (
    <div className={styles.comments}>
      <div className={styles.comments__layout} id='comments'>
        {dataToFullMessageElement()}
      </div>
    </div>
  )
}
