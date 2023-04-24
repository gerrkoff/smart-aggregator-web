import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, MessageDto } from '@/api';

type UseSearchMessage = (
  query?: string,
  options?: Partial<UseQueryOptions<MessageDto[]>>,
) => UseQueryResult<MessageDto[], unknown>;

export const useSearchMessage: UseSearchMessage = (query, options) =>
  useQuery(
    ['search message', query],
    async () => {
      const { data } = await api.searchMessageList({ query });

      return data;
    },
    options,
  );
