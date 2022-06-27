import React from 'react';
import { AiOutlineSmile, AiOutlineSend } from 'react-icons/ai';
import { toDateFormat } from '@utils/utils';

import styles from './MessageFull.module.scss';

const Image = ({ src }) => (<div className={styles.message__img}><img src={src} alt='placeholder'/></div>);

const Video = ({ href, src }) => (<a href={href} target='_blank' className={styles.message__img}><img src={src} alt='placeholder'/></a>);

const LinkElement = ({ link }) => (<a href={link} className={styles.link} target='_blank'>Ссылка на сообщение</a>);

export const MessageFull = ({ message }) => {
  const { Text, Link, CreateTime, EditTime, PhotoUrl, VideoThumbUrl } = message;

  const image = PhotoUrl || VideoThumbUrl ? <Image src={PhotoUrl || VideoThumbUrl}/> : null;
  const video = VideoThumbUrl ? <Video href={Link} src={VideoThumbUrl}/> : null;
  const link = Link ? <LinkElement link={Link}/> : null;

  return (
    <div className={styles.message}>
      {video || image}
      <div className={styles.message__info}>
        <p className={styles.message__text} dangerouslySetInnerHTML={{ __html: Text }}/>
        <div className={styles.message__reactions}>
          <AiOutlineSmile/>
          <AiOutlineSend/>
        </div>
        <span className={styles.message__data}>
          {link}
          {toDateFormat(CreateTime, EditTime)}
        </span>
      </div>
    </div>
  );
};
