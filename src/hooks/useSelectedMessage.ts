import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MessageDto, useChat, useFeed } from '@/api';

type UseSelectedMessage = () => MessageDto | undefined;

export const useSelectedMessage: UseSelectedMessage = () => {
  const { chatId, messageId } = useParams();
  const isFeed = chatId === 'feed';
  const { data: chat } = useChat(Number(chatId), { enabled: Boolean(!isFeed && chatId && messageId) });
  const { data: feed } = useFeed({ enabled: Boolean(isFeed && messageId) });

  return useMemo(() => {
    const data = isFeed ? feed : chat;

    return data?.find((message) => message.messageId.toString() === messageId);
  }, [messageId, chat, isFeed, feed]);
};
