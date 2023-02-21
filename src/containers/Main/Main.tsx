import React, { useEffect, useState } from 'react';
import { Groups, Posts, Comments } from '@containers/Main';
import { useActivePostSelector } from '@store/activePost';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { withComments } from '@/hoc-helpers';
import styles from './Main.module.scss';
import { baseAPI } from '@/api/baseAPI';
import { ReactQueryKey, TGroup, TPost } from '@/types';
import { AppStore } from '@/store/pullstate';

const CommentsContainer = ({ data }) => withComments(Comments)(data);

type TUseParams = {
  chatId: string | undefined;
};

export const Main = ({ feed }) => {
  const { chatId } = useParams<TUseParams>();
  const { filter, selectedFeed } = AppStore.useState((store) => store);

  const [wideWindow, setWideWindow] = useState<boolean>(false);

  const [chats, setChats] = useState<TGroup[]>([]);
  const [feeds, setFeeds] = useState<TPost[]>([]);

  const {
    isLoading: isLoadingChats,
    error: errorChats,
    status: statusGetGroups,
  } = useQuery({
    queryKey: [ReactQueryKey.chats],
    queryFn: () => baseAPI.getGroups(),
    onSuccess(data) {
      setChats(data);
    },
    enabled: filter.length === 0,
  });

  const {
    refetch: refetchGetGroupsByQuery,
    isLoading: isLoadingChatsQuery,
    status: statusGetGroupsByQuery,
  } = useQuery({
    queryKey: [ReactQueryKey.chatsQuery],
    queryFn: () => baseAPI.getGroupsByQuery(`${filter}`),
    onSuccess(data) {
      setChats(data);
    },
    enabled: filter.length > 0,
  });

  const { isLoading: isLoadingFeeds, isFetching: isFetchingFeeds } = useQuery({
    queryKey: [ReactQueryKey.feedsQuery],
    queryFn: () => baseAPI.getFeed(),
    onSuccess(data) {
      setFeeds(data);
    },
    enabled: filter.length === 0,
  });

  const { refetch: refetchGetPostsQuery, isLoading: isLoadingFeedsQuery } =
    useQuery({
      queryKey: [ReactQueryKey.feedsQuery],
      queryFn: () => baseAPI.getPostsQuery(`${filter}`),
      onSuccess(data) {
        setFeeds(data);
      },
      enabled: filter.length > 0,
    });

  const {
    refetch: refetchGetPostsByChatId,
    isLoading: isLoadingGetPostsByChatId,
    isFetching: isFetchingGetPostsByChatId,
  } = useQuery({
    queryKey: [ReactQueryKey.feedsByChatId],
    queryFn: () =>
      baseAPI.getPosts(chatId ? parseInt(chatId, 10) : -1001051305909),
    onSuccess(data) {
      setFeeds(data);
      if (data.length > 0) {
        AppStore.update((state) => {
          state.selectedChatId = data[0].chatId;
        });
      }
    },
    enabled: !!chatId,
  });

  useEffect(() => {
    setWideWindow(!!selectedFeed);
  }, [selectedFeed]);

  useEffect(() => {
    if (chatId) {
      refetchGetPostsByChatId();
    }
  }, [chatId]);

  useEffect(() => {
    if (filter.length > 0) {
      refetchGetGroupsByQuery();
      refetchGetPostsQuery();
    }
  }, [filter]);

  return (
    <div className={cn(styles.main, { [styles.wide]: wideWindow })}>
      {/* TODO: Rename to chats */}
      <Groups
        chats={chats}
        isLoadingChats={isLoadingChats}
        isLoadingChatsQuery={isLoadingChatsQuery}
      />
      {/* TODO: Rename to feeds */}
      <Posts
        isLoadingFeeds={isLoadingFeeds}
        isFetchingFeeds={isFetchingFeeds}
        isFetchingGetPostsByChatId={isFetchingGetPostsByChatId}
        isLoadingGetPostsByChatId={isLoadingGetPostsByChatId}
        feeds={feeds}
      />
      <CommentsContainer data={feed} />
    </div>
  );
};
