import { useAppSelector } from '@store/hooks';

export const useGroupsSelector = () => useAppSelector((store) => store.groups);
