import cn from 'clsx';
import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MessageDto } from '@/api';
import { toDateFormat } from '@/utils';

import { PostMedia } from './PostMedia';

import styles from './Post.module.scss';

export type PostProps = MessageDto & { url: string };

export const Post = memo<PostProps>(function Post({ createTime, id, media, text, url }) {
  const { messageId: urlMessageId } = useParams();

  return (
    <Link className={cn(styles.post, id.toString() === urlMessageId && styles.active)} to={url}>
      <div className={styles.post__info}>
        <PostMedia media={media} />

        <div className={styles.text__wrapper}>
          <p
            className={styles.post__text}
            dangerouslySetInnerHTML={{ __html: text ?? '' }} // eslint-disable-line react/no-danger
          />

          <span className={styles.post__data}>{toDateFormat(createTime)}</span>
        </div>
      </div>
    </Link>
  );
});
