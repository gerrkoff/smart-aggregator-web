import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppDispatch } from '@store/hooks';
import { activeChatSlice } from '@store/activeChat';
import { activeMessageSlice } from '@store/activeMessage';
import { searchSlice } from '@store/search';
import { RequestStatus, SEARCH_STATUS } from '@types';
import { chatMessagesSlice } from '@store/chatMessages';
import cn from 'classnames';

import styles from './Search.module.scss';

export const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedDispatchInput = useDebouncedCallback((valueInput) => {
    dispatch(searchSlice.actions.setInput({ input: valueInput.toLowerCase() }));
    dispatch(chatMessagesSlice.actions.setMessages({ chatMessagesData: {}, requestStatus: RequestStatus.INIT }))
  }, 300)

  const handleSearch = (e) => {
    setValue(e.target.value);
    debouncedDispatchInput(e.target.value);
  }

  const clearSearch = () => {
    if (value !== '') {
      setValue('');
      dispatch(searchSlice.actions.setInput({ input: '' }));
      dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }));
      dispatch(activeChatSlice.actions.setChatId({ chatId: 0 }));
      dispatch(activeMessageSlice.actions.setMessageId({ messageId: 0 }))
    }
  }

  return (
    <div className={styles.search}>
      <Input placeholder='Поиск' id='input' value={value} onChange={handleSearch}/>
      <AiOutlineCloseCircle className={styles.close} onClick={clearSearch}/>
    </div>
  )
}
