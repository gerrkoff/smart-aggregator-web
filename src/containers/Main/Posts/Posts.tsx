import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MessageDto, useChat, useFeed, useSearchMessage } from '@/api';
import { Loading, Post } from '@/components';

import styles from './Posts.module.scss';

const sortMessages = (arr: MessageDto[] = []): MessageDto[] =>
  arr.sort((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime));

export const Posts: FC = () => {
  const { chatId, search: query } = useParams();
  const { data: chatPosts } = useChat(Number(chatId), { enabled: Boolean(chatId) });
  const { data: feedPosts } = useFeed({ enabled: !chatId && !query });
  const { data: founded } = useSearchMessage(query ?? undefined, {
    enabled: !!query && !chatId,
  });
  const posts = useMemo(() => sortMessages(chatPosts ?? founded ?? feedPosts), [founded, chatPosts, feedPosts]);

  return (
    <div className={styles.posts}>
      <div className={styles.posts__layout}>
        {posts ? (
          posts.map((post) => {
            const { id, media, text } = post;
            if (!media?.length && !text) {
              return null;
            }

            const url = chatId ? `/chat/${chatId}/message/${id}` : `/message/${id}`;
            return <Post {...post} key={id} url={query ? `/search/${query}${url}` : url} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
