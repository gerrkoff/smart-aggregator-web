import React, { useCallback, useEffect, useState } from 'react';
import { Group, GroupPreview } from '@components';
import { getGroupLastTime } from '@utils/utils';
import { activeGroupSlice } from '@store/activeGroup';
import { postsSlice, usePostsSelector } from '@store/posts';
import { useAppDispatch } from '@store/hooks';
import { RequestStatus, TGroup } from '@types';
import { activePostSlice, useActivePostSelector } from '@store/activePost';

import styles from './Groups.module.scss';

export const Groups = ({ data }) => {
  const [groups, setGroups] = useState(data);
  const [isVisible, setIsVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { postId } = useActivePostSelector();
  const { requestStatus } = usePostsSelector();
  const dispatch = useAppDispatch();

  const sortGroups = (array) => {
    return array.sort(
      (a: TGroup, b: TGroup) => getGroupLastTime(b) - getGroupLastTime(a),
    );
  };

  useEffect(() => {
    const sortedGroups = sortGroups([...data]);
    setGroups(sortedGroups);
  }, [data]);

  useEffect(() => {
    if (requestStatus === RequestStatus.SUCCESS) {
      setDisabled(false);
    }
  }, [requestStatus]);

  useEffect(() => {
    setIsVisible(!postId);
  }, [postId]);

  const handleGroupClick = (e) => {
    if (!disabled) {
      const id = e.currentTarget.dataset.groupId;
      dispatch(activeGroupSlice.actions.setGroupId({ groupId: id }));
      dispatch(
        postsSlice.actions.setStatus({ requestStatus: RequestStatus.REQUEST }),
      );
      dispatch(activePostSlice.actions.setPostId({ postId: 0 }));
      setDisabled(true);
    }
  };

  const groupsToComponents = useCallback(
    (array) => {
      return array.map((group) => (
        <Group group={group} handleClick={handleGroupClick} key={group.id} />
      ));
    },
    [groups],
  );

  const groupsComponents = () => {
    return groupsToComponents(groups);
  };

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>{groupsComponents()}</div>
      {isVisible ? (
        <div className={styles.info__wrapper}>
          <div className={styles.groups__preview}>
            <GroupPreview data={groups} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
