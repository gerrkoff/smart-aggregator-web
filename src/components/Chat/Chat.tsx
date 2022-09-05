import React, { FC } from 'react';
import { useActiveChatSelector } from '@store/activeChat';
import Avatar from '@assets/avatar.jpg';
import { TChat } from '@types';
import cn from 'classnames';

import styles from './Chat.module.scss';

type TChatElement = {
  chat: TChat,
  onChatClick?: (e: any) => any,
}

const LinkElement = ({ src }) => (<a href={src} className={styles.chat__link} data-link>Ссылка на канал</a>)

export const Chat: FC<TChatElement> = ({ chat, onChatClick }) => {
  const { logoUrl, title, description, id, link } = chat;
  const { chatId } = useActiveChatSelector();

  const imageComponent = logoUrl ? logoUrl : Avatar;
  const linkComponent = String(chatId) === String(id) ? <LinkElement src={link}/> : null;

  return (
    <div className={cn(styles.chat, String(chatId) === String(id) ? styles.active : '')}
         data-id={id}
         data-chat
         onClick={onChatClick}>
      <div className={styles.chat__logo}>
        <img src={imageComponent} alt='placeholder'/>
      </div>
      <div className={styles.chat__text_wrapper}>
        <span className={styles.chat__title}>{title}</span>
        {linkComponent}
        <p className={styles.chat__description} data-description>{description}</p>
      </div>
    </div>
  )
}
