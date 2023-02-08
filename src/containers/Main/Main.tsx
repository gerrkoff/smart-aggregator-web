import React, { useEffect, useState } from 'react';
import { Groups, Posts, Comments } from '@containers/Main';
import { useActivePostSelector } from '@store/activePost';
import cn from 'classnames';
import { withSearch, withPost, withComments } from '@/hoc-helpers';

import styles from './Main.module.scss';

const GroupsContainer = ({ data }) => withSearch(Groups)(data);
const PostsContainer = ({ data }) => withPost(Posts)(data);
const CommentsContainer = ({ data }) => withComments(Comments)(data);

export const Main = ({ groups, feed }) => {
  const [wideWindow, setWideWindow] = useState<boolean>(false);
  const { postId } = useActivePostSelector();

  useEffect(() => {
    setWideWindow(!!postId);
  }, [postId]);

  return (
    <div className={cn(styles.main, { [styles.wide]: wideWindow })}>
      <GroupsContainer data={groups} />
      <PostsContainer data={feed} />
      <CommentsContainer data={feed} />
    </div>
  );
};
