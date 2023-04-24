import { ChangeEventHandler } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { useGo } from './useGo';

type UseInput = (time?: number) => [string, ChangeEventHandler<HTMLInputElement>];

export const useInput: UseInput = (time = 300) => {
  const { messageId = '', search: value = '' } = useParams();
  const navigate = useNavigate();
  const go = useGo();

  const handler = useDebouncedCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    const search = target.value;
    if (!search) {
      return go();
    }

    const [pattern, params] = messageId
      ? ['/search/:search/message/:messageId', { messageId, search }]
      : ['/search/:search', { search }];
    return navigate(generatePath(pattern, params));
  }, time);

  return [value, handler];
};
