import { fetchMessages } from '@store/messages';
import { fetchChats } from '@store/chats';
import { useAppDispatch } from '@store/hooks';


export const useApi = () => {
  const dispatch = useAppDispatch();

  const dispatchMessages = () => {
    dispatch(fetchMessages());
  }

  const dispatchChats = () => {
    dispatch(fetchChats());
  }

  return {
    dispatchChats,
    dispatchMessages
  };
}
