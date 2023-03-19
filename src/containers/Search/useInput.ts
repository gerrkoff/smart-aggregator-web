import { ChangeEventHandler, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

type UseInput = (time?: number) => [string, ChangeEventHandler<HTMLInputElement>];

export const useInput: UseInput = (time = 300) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Значение нужно только в момент монтирования компонента
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => searchParams.get('search') ?? '', []);

  const handler = useDebouncedCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    const updated = new URLSearchParams(searchParams);

    if (target.value) {
      updated.set('search', target.value.toLowerCase());
    } else {
      updated.delete('search');
    }

    setSearchParams(updated);
  }, time);

  return [value, handler];
};
