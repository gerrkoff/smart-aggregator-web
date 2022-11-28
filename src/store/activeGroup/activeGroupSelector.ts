import { useAppSelector } from '@store/hooks';

export const useActiveGroupSelector = () => useAppSelector((store) => store.activeGroup);
