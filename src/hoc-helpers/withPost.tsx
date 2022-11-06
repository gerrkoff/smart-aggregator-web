import React, { useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import { useAppDispatch } from '@store/hooks';
import { baseAPI } from '@api/baseAPI';
import { postsSlice } from '@store/posts';
import { RequestStatus } from '@types';

export const withPost = (Component) => {
  return (dataApi) => {
    const [data, setData] = useState(dataApi);
    const { groupId } = useActiveGroupSelector();
    const dispatch = useAppDispatch();

    useEffect(() => {
      groupId ? setTimeout(() => loadPosts(), 500) : setData(dataApi)
    }, [dataApi, groupId])

    // useEffect(() => {
    //   if (status === SEARCH_STATUS.error) {
    //     setData( [])
    //   }
    //
    //   if (status === SEARCH_STATUS.success || status === SEARCH_STATUS.default) {
    //     setData(feed)
    //   }
    // }, [status])

    const loadPosts = async () => {
      await baseAPI
        .getPosts(groupId)
        .then((res) => {
          dispatch(postsSlice.actions.setPosts({ posts: res, requestStatus: RequestStatus.SUCCESS }));
          setData(res)
        })
    }

    return <Component data={data}/>
  }
}
