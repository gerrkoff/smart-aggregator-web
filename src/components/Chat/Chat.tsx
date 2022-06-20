import React, { FC } from 'react';
import Avatar from '@assets/avatar.jpg';
import cn from 'classnames';

import styles from './Chat.module.scss';

type TChat = {
  chat: any | undefined,
  active?: string | undefined,
  onChatClick?: (e: any) => void | undefined,
}

export const Chat: FC<TChat> = ({ chat, active, onChatClick }) => {
  const { LogoUrl, Title, Description, ChatId } = chat;
  const image = LogoUrl ? LogoUrl : Avatar;

  return (
    <div className={cn(styles.chat, active === String(ChatId) ? styles.active : '')} data-id={ChatId}
         onClick={onChatClick}>
      <div className={styles.chat__logo}>
        <img src={image} alt='placeholder'/>
      </div>
      <div className={styles.chat__text_wrapper}>
        <span className={styles.chat__title}>{Title}</span>
        <p className={styles.chat__description}>{Description}</p>
      </div>
    </div>
  )
}
