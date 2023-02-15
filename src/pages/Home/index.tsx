import { useApi } from '@/hooks/useApi';
import { useFeedSelector } from '@/store/feed';
import { useGroupsSelector } from '@/store/groups';
import React, { useEffect } from 'react';
import { Main } from '@containers';

const HomePage = () => {
  const { dispatchGroups, dispatchFeed } = useApi();
  const { feed } = useFeedSelector();
  const { groups } = useGroupsSelector();

  useEffect(() => {
    dispatchGroups();
    dispatchFeed();
  }, []);

  return <Main groups={groups} feed={feed} />;
};

export { HomePage };
