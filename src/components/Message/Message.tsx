import React, { FC } from 'react';
import { useActiveMessageSelector } from '@store/activeMessage';
import { toDateFormat } from '@utils/utils';
import { TMessage } from '@types';
import cn from 'classnames';

import styles from './Message.module.scss';

type TMessageElement = {
  message: TMessage,
  onMessageClick?: (e: any) => void | undefined,
}

const LinkElement = ({ link }) => (<a href={link} className={styles.link} target='_blank'>Ссылка на сообщение</a>);

const Image = ({ src }) => (<img src={src} alt='preview'/>);

export const Message: FC<TMessageElement> = ({ message, onMessageClick }) => {
  const { Text, PhotoUrl, EditTime, CreateTime, Link, MessageId, VideoThumbUrl, ChatId } = message;
  const { messageId } = useActiveMessageSelector();

  const date = toDateFormat(EditTime, CreateTime);
  const image = PhotoUrl || VideoThumbUrl ? <Image src={PhotoUrl || VideoThumbUrl}/> : null;
  const link = Link ? <LinkElement link={Link}/> : null;

  return (
    <div className={cn(styles.message, String(messageId) === String(MessageId) ? styles.active : '')}
         data-id={MessageId}
         data-chat-id={ChatId}
         onClick={onMessageClick}>
      <div className={styles.message__info}>
        <div className={styles.text__wrapper}>
          {image}
          <p className={styles.message__text} dangerouslySetInnerHTML={{ __html: Text }}/>
        </div>
        <span className={styles.message__data}>
          {link}
          {date}
        </span>
      </div>
    </div>
  )
}
