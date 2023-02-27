import { Link, useParams } from 'react-router-dom';
import React, { FC, memo, useState } from 'react';
import { useActivePostSelector } from '@store/activePost';
import { toDateFormat } from '@utils/utils';
import { TFeed, TUseParams } from '@types';
import cn from 'classnames';

import styles from './Post.module.scss';
import { THandlePostClick } from '@/containers/Main/Posts/Posts';
import { AppStore } from '@/store/pullstate';

type TFeedElement = {
  post: TFeed;
  handleClick: ({ e, post }: THandlePostClick) => void;
};

const Image = ({ src }) => (
  <img src={src} width={100} height={100} loading="lazy" />
);

export const Post: FC<TFeedElement> = memo(({ post, handleClick }) => {
  const { allChats, selectedFeed } = AppStore.useState((store) => store);
  const [active, setActive] = useState(false);
  const { text, createTime, messageId, chatId, media } = post;
  const { postId } = useActivePostSelector();
  const { chatId: routeChatId, feedId: routeFeedId } = useParams<TUseParams>();

  const mediaComponent = () => {
    if (media.length > 0) {
      const item = media[0];
      const { photoUrl, videoThumbUrl } = item;
      return photoUrl || videoThumbUrl ? (
        <Image
          src={photoUrl || videoThumbUrl}
          key={photoUrl || videoThumbUrl}
        />
      ) : null;
    }
    return null;
  };

  return (
    <Link
      to={`/${post.chatId}/${post.id}`}
      className={cn(
        styles.post,
        selectedFeed?.messageId === post.messageId ? styles.active : '',
      )}
      data-post-id={messageId}
      data-group-id={chatId}
      onClick={(e) => {
        const matchChat = allChats.find((chat) => chat.id === post.chatId);
        handleClick({ e, post });
      }}
    >
      <div className={styles.post__info}>
        {mediaComponent()}
        <div className={styles.text__wrapper}>
          <p
            className={styles.post__text}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <span className={styles.post__data}>{toDateFormat(createTime)}</span>
        </div>
      </div>
    </Link>
  );
});
