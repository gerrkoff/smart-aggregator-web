import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, ChatDto } from '@/api';

type UseChats = (options?: Partial<UseQueryOptions<ChatDto[]>>) => UseQueryResult<ChatDto[], unknown>;

export const useChats: UseChats = (options) =>
  useQuery(
    ['chats'],
    async () => {
      const { data } = await api.chatList();

      return data;
    },
    options,
  );
