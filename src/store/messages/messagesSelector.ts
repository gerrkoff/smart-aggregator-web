import { useAppSelector } from '@store/hooks';

export const useMessagesSelector = () => useAppSelector((store) => store.messages);
