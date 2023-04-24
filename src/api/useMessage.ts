import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { api, MessageDto } from '@/api';

type UseMessage = (id: number, options?: Partial<UseQueryOptions<MessageDto>>) => UseQueryResult<MessageDto, unknown>;

export const useMessage: UseMessage = (id, options) =>
  useQuery(
    ['message detail', id],
    async () => {
      const { data } = await api.messageDetail(id);

      return data;
    },
    options,
  );
