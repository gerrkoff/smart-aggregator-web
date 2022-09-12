import React from 'react';
import { AiOutlineSmile, AiOutlineSend } from 'react-icons/ai';
import { toDateFormat } from '@utils/utils';

import styles from './MessageFull.module.scss';

const Image = ({ src }) => (<div className={styles.message__img}><img src={src} alt='placeholder'/></div>);

const Video = ({ href, src }) => (
  <a href={href} target='_blank' className={styles.message__video}><img src={src} alt='placeholder'/></a>);

const LinkElement = ({ link }) => (<a href={link} className={styles.link} target='_blank'>Ссылка на сообщение</a>);

export const MessageFull = ({ message }) => {
  const { text, link, createTime, editTime, media } = message;

  const linkComponent = link ? <LinkElement link={link}/> : null;

  const mediaComponents = () => {
    return media.map((item) => {
      const { photoUrl, videoThumbUrl } = item
      const image = photoUrl ? <Image src={photoUrl}/> : null;
      const video = videoThumbUrl ? <Video href={link} src={videoThumbUrl}/> : null;

      return [image, video]
    })
  }

  return (
    <div className={styles.message}>
      <div className={styles.message__media}>
        {mediaComponents()}
      </div>
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
