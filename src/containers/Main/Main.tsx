import React, { useEffect, useState } from 'react';
import { Groups, Posts, Comments } from '@containers/Main';
import { useActivePostSelector } from '@store/activePost';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { withComments } from '@/hoc-helpers';
import styles from './Main.module.scss';
import { baseAPI } from '@/api/baseAPI';
import { ReactQueryKey, TChat, TFeed, TUseParams } from '@/types';
import { AppStore } from '@/store/pullstate';

const CommentsContainer = ({ data }) => withComments(Comments)(data);

export const Main = ({ feed }) => {
  const { chatId, feedId: routeFeedId } = useParams<TUseParams>();
  const { filter, selectedChat, selectedFeed, allFeeds, filterClearTrigger } =
    AppStore.useState((store) => store);

  const [chats, setChats] = useState<TChat[]>([]);
  const [feeds, setFeeds] = useState<TFeed[]>([]);

  const {
    isLoading: isLoadingChats,
    error: errorChats,
    status: statusGetGroups,
  } = useQuery({
    queryKey: [ReactQueryKey.chats],
    queryFn: () => baseAPI.getChats(),
    onSuccess(data) {
      setChats(data);
      AppStore.update((state) => {
        state.allChats = data;
      });
    },
    enabled: filter.length === 0,
  });

  const {
    refetch: refetchGetGroupsByQuery,
    isLoading: isLoadingChatsQuery,
    status: statusGetGroupsByQuery,
  } = useQuery({
    queryKey: [ReactQueryKey.chatsQuery],
    queryFn: () => baseAPI.getChatsByQuery(`${filter}`),
    onSuccess(data) {
      setChats(data);
      AppStore.update((state) => {
        state.allChats = data;
      });
    },
    enabled: filter.length > 0,
  });

  const { isLoading: isLoadingFeeds, isFetching: isFetchingFeeds } = useQuery({
    queryKey: [ReactQueryKey.feedsQuery],
    queryFn: () => baseAPI.getFeeds(),
    onSuccess(data) {
      setFeeds(data);
      AppStore.update((state) => {
        state.allFeeds = data;
      });
    },
    enabled: filter.length === 0 && !chatId,
  });

  const { refetch: refetchGetPostsQuery, isLoading: isLoadingFeedsQuery } =
    useQuery({
      queryKey: [ReactQueryKey.feedsQuery],
      queryFn: () => baseAPI.getFeedsByQuery(`${filter}`),
      onSuccess(data) {
        setFeeds(data);
        AppStore.update((state) => {
          state.allFeeds = data;
        });
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
      baseAPI.getFeedsByChatId(chatId ? parseInt(chatId, 10) : -1001051305909),
    onSuccess(data) {
      setFeeds(data);
      AppStore.update((state) => {
        state.allFeeds = data;
      });
    },
    enabled: !!chatId,
  });

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

  useEffect(() => {
    if (chats.length > 0 && !!chatId && !selectedChat) {
      const matchChat = chats.find((chat) => chat.id === parseInt(chatId, 10));
      if (matchChat) {
        AppStore.update((state) => {
          state.selectedChat = matchChat;
        });
      }
    }
  }, [chats, chatId]);

  useEffect(() => {
    if (allFeeds.length && !!routeFeedId) {
      const matchFeed = feeds.find(
        (findFeed) => findFeed.id === parseInt(routeFeedId, 10),
      );
      if (matchFeed) {
        AppStore.update((state) => {
          state.selectedFeed = matchFeed;
        });
      } else {
        console.log('not match');
      }
    }
  }, [allFeeds, routeFeedId]);

  // If search, then click on post, then show content of post, then clear search
  useEffect(() => {
    if (!filter.length && selectedFeed && filterClearTrigger > 0) {
      const matchFeed = allFeeds.find(
        (feedItem) => feedItem.id === selectedFeed.id,
      );
      if (!matchFeed) {
        AppStore.update((state) => {
          state.selectedFeed = null;
        });
      }
    }
  }, [filter, selectedFeed, filterClearTrigger]);

  return (
    <div
      className={cn(styles.main, {
        [styles.wide]: selectedChat && selectedFeed,
      })}
    >
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
