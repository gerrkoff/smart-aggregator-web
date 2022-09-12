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
  const { text, editTime, createTime, link, id, media } = message;
  const { messageId } = useActiveMessageSelector();

  const date = toDateFormat(editTime, createTime);
  const linkComponent = link ? <LinkElement link={link}/> : null;

  const mediaComponents = () => {
    return media
      .map((item) => {
        const { photoUrl, videoThumbUrl } = item
        return photoUrl || videoThumbUrl ? <Image src={photoUrl || videoThumbUrl}/> : null;
      })
      .slice(0, 3)
  }

  return (
    <div className={cn(styles.message, String(messageId) === String(id) ? styles.active : '')}
         data-id={id}
         onClick={onMessageClick}>
      <div className={styles.message__info}>
        <div className={styles.text__wrapper}>
          {mediaComponents()}
          <p className={styles.message__text} dangerouslySetInnerHTML={{ __html: text }}/>
        </div>
        <span className={styles.message__data}>
          {linkComponent}
          {date}
        </span>
      </div>
    </div>
  )
}
