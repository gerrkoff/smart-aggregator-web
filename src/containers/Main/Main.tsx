import React from 'react';
import { Groups, Posts, Comments } from '@containers/Main';
import { withSearch, withPost, withComments } from '@/hoc-helpers';

import styles from './Main.module.scss';

const GroupsContainer = ({ data }) => withSearch(Groups)(data);
const PostsContainer = ({ data }) => withPost(Posts)(data);
const CommentsContainer = ({ data }) => withComments(Comments)(data);

export const Main = ({ groups, feed }) => {
  return (
    <div className={styles.main}>
      <GroupsContainer data={groups} />
      <PostsContainer data={feed} />
      <CommentsContainer data={feed} />
    </div>
  );
};
