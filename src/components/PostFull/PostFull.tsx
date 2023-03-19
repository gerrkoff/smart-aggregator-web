import { FC, MouseEventHandler } from 'react';
import { AiOutlineSend, AiOutlineSmile } from 'react-icons/ai';

import { MessageDto } from '@/api';
import { toDateFormat } from '@/utils/utils';

import styles from './PostFull.module.css';

// TODO - вынести компоненты в отдельные файлы

const Image: FC<{ src?: string }> = ({ src }) => (
  <div className={styles.post__img}>
    <img src={src} alt="" />
  </div>
);

const Video: FC<{ href?: string; src?: string }> = ({ href, src }) => (
  <a href={href} target="_blank" className={styles.post__video} rel="noreferrer">
    <img src={src} alt="video" />
  </a>
);

const LinkElement: FC<{ link?: string }> = ({ link }) => (
  <a href={link} className={styles.link} target="_blank" rel="noreferrer">
    Ссылка на источник
  </a>
);

export const PostFull: FC<{
  handleCopy: MouseEventHandler;
  post: MessageDto;
}> = ({ handleCopy, post }) => {
  const { createTime, link, media, text } = post;

  const linkComponent = link ? <LinkElement link={link} /> : null;

  const mediaComponents = () => {
    if (Array.isArray(media)) {
      const videoContainer: JSX.Element[] = [];
      const mediaElements = media?.map((item) => {
        const { photoUrl, videoThumbUrl } = item;
        const image = photoUrl ? <Image src={photoUrl} key={photoUrl} /> : null;
        const video = videoThumbUrl ? <Video href={link ?? undefined} src={videoThumbUrl} key={videoThumbUrl} /> : null;

        if (video) {
          videoContainer.push(video);
        }

        return image;
      });

      return [...mediaElements, ...videoContainer];
    }

    return null;
  };

  return (
    <div className={styles.post}>
      <div className={styles.post__media}>{mediaComponents()}</div>
      <div className={styles.post__info}>
        <p
          className={styles.post__text}
          dangerouslySetInnerHTML={{ __html: text ?? '' }} // eslint-disable-line react/no-danger
        />
        <div className={styles.post__reactions}>
          <AiOutlineSmile />
          <AiOutlineSend onClick={handleCopy} />
        </div>
        <span className={styles.post__data}>
          {linkComponent}
          {toDateFormat(createTime)}
        </span>
      </div>
    </div>
  );
};
