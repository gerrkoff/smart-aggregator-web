import { useAppSelector } from '@store/hooks';

export const useSearchSelector = () => useAppSelector((store) => store.search);
