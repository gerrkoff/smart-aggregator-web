import React, { useEffect, useState } from 'react';
import { Group, GroupPreview } from '@components';
import { getGroupLastTime } from '@utils/utils';
import { activeGroupSlice } from '@store/activeGroup';
import { postsSlice, usePostsSelector } from '@store/posts';
import { useAppDispatch } from '@store/hooks';
import { RequestStatus, TGroup } from '@types';
import { activePostSlice, useActivePostSelector } from '@store/activePost';
import { AppStore } from '@/store/pullstate';

import styles from './Groups.module.scss';
import { LoadingItem } from '@/components/Loading/Loadingitem';

type GroupsProps = {
  chats: TGroup[];
  isLoadingChats: boolean;
  isLoadingChatsQuery: boolean;
};

export type THandleGroupClick = {
  e: React.MouseEvent<HTMLElement>;
  group: TGroup;
};

export const Groups = ({ chats, isLoadingChats, isLoadingChatsQuery }: GroupsProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const sortGroups = (array) => {
    return array.sort(
      (a: TGroup, b: TGroup) => getGroupLastTime(b) - getGroupLastTime(a),
    );
  };
  
  const handleGroupClick = ({e, group}:THandleGroupClick) => {
    AppStore.update(s => {
      s.selectedFeed = null
      s.selectedChat = group
    })

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

  return (
    <div className={styles.groups}>
      <div className={styles.groups__layout}>
        {/* TODO: Add Error condition */}
        {isLoadingChats || isLoadingChatsQuery ? Array.from({length: 10}).map((_,indx)=><LoadingItem key={indx} type="chat"/>) : chats.sort((a: TGroup, b: TGroup) => getGroupLastTime(b) - getGroupLastTime(a)).map((group) => {
          return (
            <Group
              group={group}
              handleClick={handleGroupClick}
              key={group.id}
            />
          );
        })}
      </div>
      {isVisible ? (
        <div className={styles.info__wrapper}>
          <div className={styles.groups__preview}>
            <GroupPreview chats={chats} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
