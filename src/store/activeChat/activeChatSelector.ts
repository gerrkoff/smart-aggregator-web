import { useAppSelector } from '@store/hooks';

export const useActiveChatSelector = () => useAppSelector((store) => store.activeChat);
