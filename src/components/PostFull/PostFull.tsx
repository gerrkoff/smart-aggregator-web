import React from 'react';
import { AiOutlineSmile, AiOutlineSend } from 'react-icons/ai';
import { toDateFormat } from '@utils/utils';

import styles from './PostFull.module.scss';

const Image = ({ src }) => (<div className={styles.post__img}><img src={src} alt='placeholder'/></div>);

const Video = ({ href, src }) => (
  <a href={href} target='_blank' className={styles.post__video}><img src={src} alt='placeholder'/></a>);

const LinkElement = ({ link }) => (<a href={link} className={styles.link} target='_blank'>Ссылка на источник</a>);

export const PostFull = ({ post, handleCopy}) => {
  const { text, link, createTime, media } = post;

  const linkComponent = link ? <LinkElement link={link}/> : null;

  const mediaComponents = () => {
    if (Array.isArray(media)) {
      const videoContainer = []
      const mediaElements = media?.map((item) => {
        const { photoUrl, videoThumbUrl } = item
        const image = photoUrl ? <Image src={photoUrl} key={photoUrl}/> : null;
        const video = videoThumbUrl ? <Video href={link} src={videoThumbUrl} key={videoThumbUrl}/> : null;
        // @ts-ignore
        videoContainer.push(video)

        return image
      })

      return [...mediaElements, ...videoContainer]
    }

    return null
  }

  return (
    <div className={styles.post}>
      <div className={styles.post__media}>
        {mediaComponents()}
      </div>
      <div className={styles.post__info}>
        <p className={styles.post__text} dangerouslySetInnerHTML={{ __html: text }}/>
        <div className={styles.post__reactions}>
          <AiOutlineSmile/>
          <AiOutlineSend onClick={handleCopy}/>
        </div>
        <span className={styles.post__data}>
          {linkComponent}
          {toDateFormat(createTime)}
        </span>
      </div>
    </div>
  );
};
