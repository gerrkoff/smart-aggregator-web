import React from 'react';
import { AiOutlineSmile, AiOutlineSend } from 'react-icons/ai';
import { toDateFormat } from '@utils/utils';

import styles from './MessageFull.module.scss';

const Image = ({ src }) => (<div className={styles.message__img}><img src={src} alt='placeholder'/></div>);

const Video = ({ href, src }) => (<a href={href} target='_blank' className={styles.message__img}><img src={src} alt='placeholder'/></a>);

const LinkElement = ({ link }) => (<a href={link} className={styles.link} target='_blank'>Ссылка на сообщение</a>);

export const MessageFull = ({ message }) => {
  const { text, link, createTime, editTime } = message;

  // const image = PhotoUrl || VideoThumbUrl ? <Image src={PhotoUrl || VideoThumbUrl}/> : null;
  // const video = VideoThumbUrl ? <Video href={Link} src={VideoThumbUrl}/> : null;
  const linkComponent = link ? <LinkElement link={link}/> : null;

  return (
    <div className={styles.message}>
      {/*{video || image}*/}
      <div className={styles.message__info}>
        <p className={styles.message__text} dangerouslySetInnerHTML={{ __html: text }}/>
        <div className={styles.message__reactions}>
          <AiOutlineSmile/>
          <AiOutlineSend/>
        </div>
        <span className={styles.message__data}>
          {linkComponent}
          {toDateFormat(editTime, createTime)}
        </span>
      </div>
    </div>
  );
};
