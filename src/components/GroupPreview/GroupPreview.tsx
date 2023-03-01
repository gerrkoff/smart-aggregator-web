import React from 'react';
import { Group } from '@components';
import { TChat } from '@types';
import { AppStore } from '@/store/pullstate';

type GroupPreview = {
  chat: TChat;
};

export const GroupPreview = ({ chat }: GroupPreview) => {
  const { selectedChat, selectedFeed } = AppStore.useState((store) => store);
  return selectedChat && !selectedFeed ? <Group group={chat} /> : null;
};
