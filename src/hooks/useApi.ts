import { fetchFeed } from '@store/feed';
import { fetchGroups } from '@store/groups';
import { useAppDispatch } from '@store/hooks';


export const useApi = () => {
  const dispatch = useAppDispatch();

  const dispatchFeed = () => {
    dispatch(fetchFeed());
  }

  const dispatchGroups = () => {
    dispatch(fetchGroups());
  }

  return {
    dispatchGroups,
    dispatchFeed
  };
}
