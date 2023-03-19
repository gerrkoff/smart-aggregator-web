import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MessageDto, useChat, useFeed } from '@/api';
import { Loading, Post } from '@/components';

import styles from './Posts.module.scss';

const sortMessages = (arr: MessageDto[] = []): MessageDto[] =>
  arr.sort((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime));

export const Posts: FC = () => {
  const { chatId } = useParams();
  const isFeed = !chatId || chatId === 'feed';
  const { data: chatPosts } = useChat(Number(chatId), { enabled: Boolean(chatId && !isFeed) });
  const { data: feedPosts } = useFeed({ enabled: isFeed });
  const posts = useMemo(() => sortMessages(isFeed ? feedPosts : chatPosts), [isFeed, chatPosts, feedPosts]);

  return (
    <div className={styles.posts}>
      <div className={styles.posts__layout}>
        {posts ? (
          posts.map((post) =>
            post.media?.length || post.text ? <Post isFeed={isFeed} post={post} key={post.id} /> : undefined,
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
