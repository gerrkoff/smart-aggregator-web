import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, MessageDto } from '@/api';

type UseChat = (
  chatId: number,
  options?: Partial<UseQueryOptions<MessageDto[]>>,
) => UseQueryResult<MessageDto[], unknown>;

export const useChat: UseChat = (chatId: number, options) =>
  useQuery(
    ['posts', chatId],
    async () => {
      const { data } = await api.messageList({ chatId });

      return data;
    },
    options,
  );
