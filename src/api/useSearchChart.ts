import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, ChatDto } from '@/api';

type UseSearchChart = (
  query?: string,
  options?: Partial<UseQueryOptions<ChatDto[]>>,
) => UseQueryResult<ChatDto[], unknown>;

export const useSearchChart: UseSearchChart = (query, options) =>
  useQuery(
    ['search chart', query],
    async () => {
      const { data } = await api.searchChatList({ query });

      return data;
    },
    options,
  );
