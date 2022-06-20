import React, { FC } from 'react';
import { toDateFormat } from '@utils/utils';

import styles from './Message.module.scss';

export type TMessage = {
  ChatId: string | number,
  MessageId: string | number,
  Text: string,
  CreateTime: number,
  EditTime: number,
  Link: string,
  PhotoUrl: string,
  VideoFileName: string,
  VideoThumbUrl: string,
}

export const Message: FC<TMessage> = ({ ...message }) => {
  const { Text, PhotoUrl, EditTime, CreateTime, Link, MessageId } = message;

  const date = toDateFormat(EditTime, CreateTime);
  const image = PhotoUrl ? <img src={PhotoUrl} alt='preview'/> : null;
  const link = Link ? <a href={Link} className={styles.link} target='_blank'>Ссылка на сообщение</a> : null;

  return (
    <div className={styles.message} data-id={MessageId}>
      <div className={styles.message__info}>
        <div className={styles.text__wrapper}>
          {image}
          <p className={styles.message__text} dangerouslySetInnerHTML={{ __html: Text }}/>
        </div>
        {link}
        <span className={styles.message__date}>
          {date}
        </span>
      </div>
    </div>
  )
}
