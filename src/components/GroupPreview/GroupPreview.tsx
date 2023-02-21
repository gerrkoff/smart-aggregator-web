import React, { useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import { Group } from '@components';
import { TGroup } from '@types';
import { AppStore } from '@/store/pullstate';

type GroupPreview = {
  chats: TGroup[];
};

export const GroupPreview = ({ chats }) => {
  const { selectedChat } = AppStore.useState((store) => store);
  const [activeGroup, setActiveGroup] = useState();
  const { groupId } = useActiveGroupSelector();

  useEffect(() => {
    const group = chats.find((x: TGroup) => String(x.id) === String(groupId));
    setActiveGroup(group);
  }, [groupId]);

  return selectedChat ? <Group group={selectedChat} /> : null;
};
