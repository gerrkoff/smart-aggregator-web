import { Main } from '@containers';
import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { useFeedSelector } from '@/store/feed';

const HomePage = () => {
  const { dispatchGroups, dispatchFeed } = useApi();
  const { feed } = useFeedSelector();

  useEffect(() => {
    dispatchGroups();
    dispatchFeed();
  }, []);

  return <Main feed={feed} />;
};

export { HomePage };
