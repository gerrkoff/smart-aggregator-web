import { useAppSelector } from '@store/hooks';

export const useActivePostSelector = () =>
  useAppSelector((store) => store.activePost);
