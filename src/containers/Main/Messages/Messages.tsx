import React, { useEffect } from 'react';
import { Message, SearchError } from '@components';
import { getMessageLastTime } from '@utils/utils';
import { useMessagesSelector } from '@store/messages';
import { activeChatSlice, useActiveChatSelector } from '@store/activeChat';
import { activeMessageSlice } from '@store/activeMessage';
import { useAppDispatch } from '@store/hooks';
import { useSearchSelector } from '@store/search';
import { SEARCH_STATUS, TMessage } from '@types';

import styles from './Messages.module.scss';
import { useChatMessagesSelector } from '@store/chatMessages';

export const Messages = () => {
  let dataForSort;

  const dispatch = useAppDispatch();
  const { data } = useMessagesSelector();
  const { chatMessagesData } = useChatMessagesSelector();
  const { chatId } = useActiveChatSelector();
  const { input, status } = useSearchSelector();

  useEffect(() => {
    if (input && dataForSort.length > 0 && status === SEARCH_STATUS.success) {
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: dataForSort[0].MessageId }))
    } else if (status === SEARCH_STATUS.error && input) {
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: 0 }))
    } else if (dataForSort.length > 0 && chatId) {
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: dataForSort[0].MessageId }))
    } else if (dataForSort.length <= 0 && chatId) {
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: 0 }))
    }
  }, [chatId, input])

  const handleClickOnMessage = (e) => {
    const id = e.currentTarget.dataset.id;
    // const chatId = e.currentTarget.dataset.chatId;
    dispatch(activeMessageSlice.actions.setMessageId({ messageId: id }))
    // dispatch(activeChatSlice.actions.setChatId({ chatId: chatId }))
  }

  const sortData = (dataForSort) => {
    return dataForSort
      ?.sort((a: TMessage, b: TMessage) => getMessageLastTime(b) - getMessageLastTime(a))
      ?.map((message) => {
        return <Message message={message}
                        onMessageClick={handleClickOnMessage}
                        key={`${message.createTime}-${message.id}`}/>
      })
  }


  const dataToMessageElements = () => {
    // @ts-ignore
    if (chatMessagesData.length > 0) {
      dataForSort = [...chatMessagesData];
    } else if (data) {
      dataForSort = [...data];
    }

    // if (chatId) {
    //   dataForSort = data?.filter((message: TMessage) => String(message.id) === String(chatId));
    // }

    if (status === SEARCH_STATUS.error) {
      return <SearchError/>
    }

    return sortData(dataForSort)
  }

  return (
    <div className={styles.messages}>
      <div className={styles.messages__layout} id='messages'>
        {dataToMessageElements()}
      </div>
    </div>
  )
}
