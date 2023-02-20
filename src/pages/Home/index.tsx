import { useApi } from '@/hooks/useApi';
import { useFeedSelector } from '@/store/feed';
import { useGroupsSelector } from '@/store/groups';
import React, { useEffect } from 'react';
import { Main } from '@containers';

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
