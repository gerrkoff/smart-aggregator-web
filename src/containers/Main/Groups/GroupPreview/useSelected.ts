import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatDto, useChats } from '@/api';

type UseSelected = () => ChatDto | undefined;

export const useSelected: UseSelected = () => {
  const { chatId } = useParams();
  const { data } = useChats();

  return useMemo(() => data?.find((group) => group.id.toString() === chatId), [data, chatId]);
};
