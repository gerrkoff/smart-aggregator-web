import { AiOutlineSend } from '@react-icons/all-files/ai/AiOutlineSend';
import { AiOutlineSmile } from '@react-icons/all-files/ai/AiOutlineSmile';
import { FC, MouseEventHandler } from 'react';

import { MessageDto } from '@/api';
import { toDateFormat } from '@/utils';

import styles from './PostFull.module.css';

// TODO - вынести компоненты в отдельные файлы

const Image: FC<{ src?: string }> = ({ src }) => (
  <div className={styles.post__img}>
    <img alt="" src={src} />
  </div>
);

const Video: FC<{ href?: string; src?: string }> = ({ href, src }) => (
  <a className={styles.post__video} href={href} rel="noreferrer" target="_blank">
    <img alt="video" src={src} />
  </a>
);

const LinkElement: FC<{ link?: string }> = ({ link }) => (
  <a className={styles.link} href={link} rel="noreferrer" target="_blank">
    Ссылка на источник
  </a>
);

export type PostFullProps = {
  handleCopy: MouseEventHandler;
  post: MessageDto;
};

export const PostFull: FC<PostFullProps> = ({ handleCopy, post }) => {
  const { createTime, link, media, text } = post;

  const linkComponent = link ? <LinkElement link={link} /> : null;

  const mediaComponents = () => {
    if (Array.isArray(media)) {
      const videoContainer: JSX.Element[] = [];
      const mediaElements = media?.map((item) => {
        const { photoUrl, videoThumbUrl } = item;
        const image = photoUrl ? <Image key={photoUrl} src={photoUrl} /> : null;
        const video = videoThumbUrl ? <Video key={videoThumbUrl} href={link ?? undefined} src={videoThumbUrl} /> : null;

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
    <article className={styles.post}>
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
    </article>
  );
};
