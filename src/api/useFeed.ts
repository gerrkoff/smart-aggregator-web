import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, MessageDto } from '@/api';

type UseFeed = (options?: Partial<UseQueryOptions<MessageDto[]>>) => UseQueryResult<MessageDto[], unknown>;

export const useFeed: UseFeed = (options) =>
  useQuery(
    ['feed'],
    async () => {
      const { data } = await api.messageFeedList();

      return data;
    },
    options,
  );
