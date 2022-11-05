import React, { useEffect, useState } from 'react';
import { useActivePostSelector } from '@store/activePost';
import { useActiveGroupSelector } from '@store/activeGroup';

export const withComments = (Component) => {
  return (dataApi) => {
    const [data, setData] = useState(dataApi);
    const { postId } = useActivePostSelector();
    const { groupId } = useActiveGroupSelector();

    useEffect(() => {
      const post = findPost();
      setData(post)
    }, [postId])

    useEffect(() => {
      setData(null)
    }, [groupId])

    const findPost = () => {
      return dataApi?.find((post) => String(post.messageId) === String(postId));
    }

    return <Component data={data}/>
  }
}
