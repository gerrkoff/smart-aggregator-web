import React, { useEffect, useState } from 'react';
import { Post } from '@components';
import { activePostSlice } from '@store/activePost';
import { useAppDispatch } from '@store/hooks';
import { TPost } from '@types';

import styles from './Posts.module.scss';

const DataToPosts = ({ data, handlePostClick }) => {
  const [posts, setPosts] = useState([...data]);

  useEffect(() => {
    const sortedPosts = sortPosts([...data])
    setPosts(sortedPosts)
  }, [data])

  const sortPosts = (array) => {
    return array.sort((a: TPost, b: TPost) => Date.parse(b.createTime) - Date.parse(a.createTime));
  }

  return (<>{posts.map(post => <Post post={post} handleClick={handlePostClick} key={post.id}/>)}</>)
}

export const Posts = ({ data }) => {
  const [posts, setPosts] = useState(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPosts(data)
  }, [data])

  const handlePostClick = (e) => {
    const id = e.currentTarget.dataset.postId;
    dispatch(activePostSlice.actions.setPostId({ postId: id }))
  }

  return (
    <div className={styles.posts}>
      <div className={styles.posts__layout} id='posts'>
        {posts.length > 0 ? <DataToPosts data={posts} handlePostClick={handlePostClick}/> : null}
      </div>
    </div>
  )
}
