import { useAppSelector } from '@store/hooks';

export const useChatsSelector = () => useAppSelector((store) => store.chats);
