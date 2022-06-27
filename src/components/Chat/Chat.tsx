import React, { FC } from 'react';
import { useActiveChatSelector } from '@store/activeChat';
import Avatar from '@assets/avatar.jpg';
import { TChat } from '@types';
import cn from 'classnames';

import styles from './Chat.module.scss';

type TChatElement = {
  chat: TChat,
  onChatClick?: (e: any) => void | undefined,
}

const LinkElement = ({ src }) => (<a href={src} className={styles.chat__link} data-link>Ссылка на канал</a>)

export const Chat: FC<TChatElement> = ({ chat, onChatClick }) => {
  const { LogoUrl, Title, Description, ChatId, Link } = chat;
  const { chatId } = useActiveChatSelector();

  const image = LogoUrl ? LogoUrl : Avatar;
  const link = String(chatId) === String(ChatId) ? <LinkElement src={Link}/> : null;

  return (
    <div className={cn(styles.chat, String(chatId) === String(ChatId) ? styles.active : '')}
         data-id={ChatId}
         data-chat
         onClick={onChatClick}>
      <div className={styles.chat__logo}>
        <img src={image} alt='placeholder'/>
      </div>
      <div className={styles.chat__text_wrapper}>
        <span className={styles.chat__title}>{Title}</span>
        {link}
        <p className={styles.chat__description} data-description>{Description}</p>
      </div>
    </div>
  )
}
