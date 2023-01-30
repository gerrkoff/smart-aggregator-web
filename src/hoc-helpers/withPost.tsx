import React, { useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import { useAppDispatch } from '@store/hooks';
import { baseAPI } from '@api/baseAPI';
import { postsSlice, usePostsSelector } from '@store/posts';
import { RequestStatus } from '@types';

export const withPost = (Component) => {
  return function (dataApi) {
    const [data, setData] = useState(dataApi);
    const { groupId } = useActiveGroupSelector();
    const { requestStatus } = usePostsSelector();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (requestStatus === RequestStatus.REQUEST) {
        setTimeout(() => loadPosts(), 500);
      }
      if (requestStatus === RequestStatus.INIT) {
        setData(dataApi);
      }
    }, [dataApi, requestStatus]);

    const loadPosts = async () => {
      await baseAPI.getPosts(groupId).then((res) => {
        dispatch(
          postsSlice.actions.setPosts({
            posts: res,
            requestStatus: RequestStatus.SUCCESS,
          }),
        );
        setData(res);
      });
    };

    return <Component data={data} />;
  };
};
