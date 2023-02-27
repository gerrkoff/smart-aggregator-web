import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { Input } from '@components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { searchSlice } from '@store/search';

import { SEARCH_STATUS } from '@types';
import styles from './Search.module.scss';
import { AppStore } from '@/store/pullstate';

export const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedDispatchInput = useDebouncedCallback((valueInput) => {
    AppStore.update((s) => {
      s.filter = valueInput;
    });
    dispatch(searchSlice.actions.setSearch({ search: valueInput }));
  }, 300);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setValue(val);
    debouncedDispatchInput(val);
  };

  const clearSearch = () => {
    setValue('');
    AppStore.update((s) => {
      s.filter = '';
      s.selectedChat = null;
      s.filterClearTrigger = Date.now();
    });
    navigate('/');
    dispatch(searchSlice.actions.setSearch({ search: '' }));
    dispatch(
      searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }),
    );
  };

  return (
    <div className={styles.search}>
      <Input
        placeholder="Поиск"
        id="input"
        value={value}
        onChange={handleSearch}
      />
      <AiOutlineCloseCircle className={styles.close} onClick={clearSearch} />
    </div>
  );
};
