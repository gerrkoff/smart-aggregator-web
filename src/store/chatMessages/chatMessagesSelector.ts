import { useAppSelector } from '@store/hooks';

export const useChatMessagesSelector = () => useAppSelector((store) => store.chatMessages);
