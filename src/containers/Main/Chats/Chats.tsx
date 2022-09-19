import React, { useEffect } from 'react';
import { Chat, SearchError } from '@components';
import { useChatsSelector } from '@store/chats/chatsSelector';
import { useAppDispatch } from '@store/hooks';
import { getChatLastTime } from '@utils/utils';
import { searchSlice, useSearchSelector } from '@store/search';
import { activeChatSlice, useActiveChatSelector } from '@store/activeChat';
import { activeMessageSlice } from '@store/activeMessage';
import { RequestStatus, SEARCH_STATUS, TChat } from '@types';
import { chatMessagesSlice } from '@store/chatMessages/chatMessagesSlice';
import { baseAPI } from '@api/baseAPI';

import styles from './Chats.module.scss';

export const Chats = () => {
  let dataForSort;

  const dispatch = useAppDispatch();
  const { chatId } = useActiveChatSelector();
  const { data } = useChatsSelector();
  const { input, status } = useSearchSelector();

  useEffect(() => {
    if (dataForSort.length <= 0 && input) {
      dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.error }))
      dispatch(activeChatSlice.actions.setChatId({ chatId: 0 }));
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: 0 }))
    } else if (dataForSort.length > 0 && input) {
      dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.success }))
      dispatch(activeChatSlice.actions.setChatId({ chatId: dataForSort[0].ChatId }))
    } else if (!input) {
      dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }))
    }
  }, [input])

  const searchForChat = (): TChat => {
    // @ts-ignore
    return data?.filter((chat: TChat) => String(chat.id) === String(chatId))[0];
  }

  const handleClickOnChat = async (e) => {
    const id = e.currentTarget.dataset.id;
    dispatch(activeChatSlice.actions.setChatId({ chatId: id }))

    await baseAPI
      .getMessages(id)
      .then((data) => {
        dispatch(chatMessagesSlice.actions.setMessages({ chatMessagesData: data, requestStatus: RequestStatus.SUCCESS }))
      })
  }

  const sortData = (dataForSort) => {
    return dataForSort
      ?.sort((a: TChat, b: TChat) => getChatLastTime(b) - getChatLastTime(a))
      ?.map((chat) => {
        return <Chat chat={chat}
                     onChatClick={handleClickOnChat}
                     key={chat.id}/>
      })
  }

  const dataToChatElements = () => {
    if (data) {
      dataForSort = [...data];
    }

    if (input) {
      dataForSort = data?.filter((chat) => chat.description.toLowerCase().includes(input));
    }

    if (status === SEARCH_STATUS.error) {
      return <SearchError/>
    }

    return sortData(dataForSort);
  }


  return (
    <div className={styles.chats}>
      <div className={styles.chats__layout} id='chats'>
        {dataToChatElements()}
      </div>
      <div className={styles.info__wrapper}>
        <div className={styles.chats__info} id='chats-info'>
          {chatId ? <Chat chat={searchForChat()}/> : null}
        </div>
      </div>
    </div>
  )
}
