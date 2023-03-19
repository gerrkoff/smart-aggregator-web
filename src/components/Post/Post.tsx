import cn from 'clsx';
import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MessageDto } from '@/api';
import { toDateFormat } from '@/utils/utils';

import { PostMedia } from './PostMedia';

import styles from './Post.module.scss';

export type PostProps = {
  isFeed?: boolean;
  post: MessageDto;
};

export const Post = memo<PostProps>(function Post({ isFeed, post }) {
  const { messageId: urlMessageId } = useParams();
  const { chatId, createTime, media, messageId, text } = post;

  return (
    <Link
      to={`/${isFeed ? 'feed' : chatId}/${messageId}`}
      className={cn(styles.post, post.messageId.toString() === urlMessageId && styles.active)}
    >
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
