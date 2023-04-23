import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

type UseGroupUrl = () => (id: string | number) => string;

export const useGroupUrl: UseGroupUrl = () => {
  const { messageId, search } = useParams();

  return useCallback(
    (id: string | number) => {
      let url = `/chat/${id}`;

      if (search) {
        url = `/search/${search}${url}`;
      }

      if (messageId) {
        url = `${url}/message/${messageId}`;
      }

      return url;
    },
    [messageId, search],
  );
};
