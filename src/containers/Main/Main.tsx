import React, { useEffect, useState } from 'react';
import { Groups, Posts, Comments } from '@containers/Main';
import { withSearch, withPost, withComments } from '@/hoc-helpers';
import { useGroupsSelector } from '@store/groups';
import { useFeedSelector } from '@store/feed';

import styles from './Main.module.scss';

const GroupsContainer = ({ data }) => withSearch(Groups)(data);
const PostsContainer = ({ data }) => withPost(Posts)(data);
const CommentsContainer = ({ data }) => withComments(Comments)(data);

export const Main = () => {
  const { groups } = useGroupsSelector();
  const { feed } = useFeedSelector();
  const [groupsData, setGroupsData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    // @ts-ignore
    setGroupsData(groups)
  }, [groups])

  useEffect(() => {
    // @ts-ignore
    setPostsData(feed)
  }, [feed])

  return (
    <div className={styles.main}>
      <GroupsContainer data={groupsData}/>
      <PostsContainer data={postsData}/>
      <CommentsContainer data={postsData}/>
    </div>
  )
}
