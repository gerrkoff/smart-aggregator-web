import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useAppDispatch } from '@store/hooks';
import { activeChatSlice } from '@store/activeChat';
import { activeMessageSlice } from '@store/activeMessage';
import { searchSlice } from '@store/search';

import styles from './Search.module.scss';
import { SEARCH_STATUS } from '@types';

export const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedDispatchInput = useDebouncedCallback((valueInput) => {
    dispatch(searchSlice.actions.setInput({ input: valueInput.toLowerCase() }));
  }, 300)

  const handleSearch = (e) => {
    setValue(e.target.value);
    debouncedDispatchInput(e.target.value);
  }

  const clearSearch = () => {
    setValue('');
    dispatch(searchSlice.actions.setInput({ input: '' }));
    dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }));
    dispatch(activeChatSlice.actions.setChatId({ chatId: 0 }));
    dispatch(activeMessageSlice.actions.setMessageId({ messageId: 0 }))
  }

  return (
    <div className={styles.input}>
      <Input placeholder='Поиск' id='input' value={value} onChange={handleSearch}/>
      <AiOutlineCloseCircle className={styles.close} onClick={clearSearch}/>
    </div>
  )
}
