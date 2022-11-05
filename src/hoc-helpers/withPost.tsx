import React, { useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import { useSearchSelector } from '@store/search';
import { useFeedSelector } from '@store/feed';
import { useAppDispatch } from '@store/hooks';
import { baseAPI } from '@api/baseAPI';
import { SEARCH_STATUS } from '@types';
import { postsSlice } from '@store/posts';

export const withPost = (Component) => {
  return (dataApi) => {
    const [data, setData] = useState(dataApi);
    const { groupId } = useActiveGroupSelector();
    const { status } = useSearchSelector();
    const { feed } = useFeedSelector();
    const dispatch = useAppDispatch();

    useEffect(() => {
      groupId ? loadPosts() : setData(dataApi)
    }, [dataApi, groupId])

    useEffect(() => {
      if (status === SEARCH_STATUS.error) {
        setData( [])
      }

      if (status === SEARCH_STATUS.success || status === SEARCH_STATUS.default) {
        setData(feed)
      }
    }, [status])

    const loadPosts = async () => {
      await baseAPI
        .getPosts(groupId)
        .then((res) => {
          dispatch(postsSlice.actions.setPosts({ posts: res }));
          setData(res)
        })
    }

    return <Component data={data}/>
  }
}
