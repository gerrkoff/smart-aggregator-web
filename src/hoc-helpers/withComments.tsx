import React, { useEffect, useState } from 'react';
import { useActivePostSelector } from '@store/activePost';
import { usePostsSelector } from '@store/posts';
import { RequestStatus } from '@types';

export const withComments = (Component) => {
  return function WithComments(dataApi) {
    const [data, setData] = useState(null);
    const { postId } = useActivePostSelector();
    const { posts, requestStatus } = usePostsSelector();

    const findPost = () => {
      const post = posts?.find((p) => String(p.messageId) === String(postId));
      // @ts-ignore
      setData(post);
    };

    const findPostInFeed = () => {
      const post = dataApi?.find((p) => String(p.messageId) === String(postId));
      setData(post);
    };

    useEffect(() => {
      if (requestStatus === RequestStatus.SUCCESS) {
        findPost();
      }
      if (requestStatus === RequestStatus.INIT) {
        findPostInFeed();
      }
    }, [postId]);

    useEffect(() => {
      setData(null);
    }, [requestStatus]);

    return <Component data={data} />;
  };
};
