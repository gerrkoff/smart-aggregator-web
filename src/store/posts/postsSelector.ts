import { useAppSelector } from '@store/hooks';

export const usePostsSelector = () => useAppSelector((store) => store.posts);
