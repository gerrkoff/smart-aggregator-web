import React, { useEffect, useState } from 'react';
import { Post } from '@components';
import { activePostSlice } from '@store/activePost';
import { useAppDispatch } from '@store/hooks';
import { RequestStatus, TFeed } from '@types';
import { usePostsSelector } from '@store/posts';
import { activeGroupSlice } from '@store/activeGroup';

import styles from './Posts.module.scss';
import { AppStore } from '@/store/pullstate';
import { LoadingItem } from '@/components/Loading';

type PostsProps = {
  feeds: TFeed[];
  isLoadingFeeds: boolean;
  isFetchingFeeds: boolean;
  isLoadingGetPostsByChatId: boolean;
  isFetchingGetPostsByChatId: boolean;
};

// TODO: Replace to type declaration
export type THandlePostClick = {
  e: React.MouseEvent<HTMLElement>;
  post: TFeed;
};

export const Posts = ({
  feeds,
  isLoadingFeeds,
  isFetchingFeeds,
  isLoadingGetPostsByChatId,
  isFetchingGetPostsByChatId,
}: PostsProps) => {
  const dispatch = useAppDispatch();
  const isLoading =
    isLoadingFeeds ||
    isFetchingFeeds ||
    isLoadingGetPostsByChatId ||
    isFetchingGetPostsByChatId;

  const handlePostClick = ({ e, post }: THandlePostClick) => {
    AppStore.update((store) => {
      store.selectedFeed = post;
    });
    const { postId } = e.currentTarget.dataset;
    const { groupId } = e.currentTarget.dataset;
    dispatch(activePostSlice.actions.setPostId({ postId }));
    dispatch(
      activePostSlice.actions.setStatus({
        requestStatus: RequestStatus.REQUEST,
      }),
    );
    dispatch(activeGroupSlice.actions.setGroupId({ groupId }));
  };

  return (
    <div className={styles.posts}>
      <div className={styles.posts__layout} id="posts">
        {isLoading
          ? Array.from({ length: 3 }).map((_, indx) => (
              // eslint-disable-next-line
              <LoadingItem key={indx} type="feed" />
            ))
          : feeds.map((post) => {
              return (
                <Post post={post} handleClick={handlePostClick} key={post.id} />
              );
            })}
      </div>
    </div>
  );
};
