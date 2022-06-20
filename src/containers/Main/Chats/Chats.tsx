import React, { useState } from 'react';
import { Chat } from '@components';

import styles from './Chats.module.scss';

export const Chats = ({ chats }) => {
  const [chatActive, setChatActive] = useState();
  const [chatInfo, setChatInfo] = useState();

  const handleClickOnChat = (e) => {
    const id = e.currentTarget.dataset.id;
    const chat = chats
      ?.filter((chat) => String(chat.ChatId) === String(id))[0];

    setChatActive(id);
    setChatInfo(chat);
  }

  return (
    <div className={styles.chats}>
      <div className={styles.chats__layout} id='chats'>
        {chats
          ?.sort((a, b) => b.CreateTime - a.CreateTime)
          ?.map((chat) => <Chat chat={chat} active={chatActive} onChatClick={handleClickOnChat} key={chat.ChatId}/>)
        }
      </div>
      <div className={styles.info__wrapper}>
        <div className={styles.chats__info} id='chats-info'>
          {chatInfo ? <Chat chat={chatInfo}/> : null}
        </div>
      </div>
    </div>
  )
}
