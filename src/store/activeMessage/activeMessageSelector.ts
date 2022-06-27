import { useAppSelector } from '@store/hooks';

export const useActiveMessageSelector = () => useAppSelector((store) => store.activeMessage);
