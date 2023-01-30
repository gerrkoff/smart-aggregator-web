import React, { useCallback, useEffect, useState } from 'react';
import { Loading, Post } from '@components';
import { activePostSlice } from '@store/activePost';
import { useAppDispatch } from '@store/hooks';
import { RequestStatus, TPost } from '@types';
import { usePostsSelector } from '@store/posts';
import { activeGroupSlice } from '@store/activeGroup';

import styles from './Posts.module.scss';

export const Posts = ({ data }) => {
  const [posts, setPosts] = useState(data);
  const [loading, setLoading] = useState(false);
  const { requestStatus } = usePostsSelector();
  const dispatch = useAppDispatch();

  const sortPosts = (array) => {
    return array.sort(
      (a: TPost, b: TPost) =>
        Date.parse(b.createTime) - Date.parse(a.createTime),
    );
  };

  useEffect(() => {
    const sortedData = sortPosts([...data]);
    setPosts(sortedData);
  }, [data]);

  useEffect(() => {
    if (
      requestStatus === RequestStatus.SUCCESS ||
      requestStatus === RequestStatus.INIT
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    return () => {
      setPosts([]);
    };
  }, [requestStatus]);

  const handlePostClick = (e) => {
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

  const postsToComponents = (array) => {
    return array.map((post) => {
      if (post.media.length > 0 || post.text) {
        return <Post post={post} handleClick={handlePostClick} key={post.id} />;
      }
      return undefined;
    });
  };

  const postsComponents = useCallback(() => postsToComponents(posts), [posts]);

  return (
    <div className={styles.posts}>
      <div className={styles.posts__layout} id="posts">
        {loading ? <Loading /> : postsComponents()}
      </div>
    </div>
  );
};
