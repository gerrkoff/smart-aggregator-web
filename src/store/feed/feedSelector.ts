import { useAppSelector } from '@/store/hooks';

export const useFeedSelector = () => useAppSelector((store) => store.feed);
