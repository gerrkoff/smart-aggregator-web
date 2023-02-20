import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '@store/hooks';
import { Input } from '@components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { searchSlice } from '@store/search';

import { SEARCH_STATUS } from '@types';
import styles from './Search.module.scss';
import { AppStore } from '@/store/pullstate';

export const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedDispatchInput = useDebouncedCallback((valueInput) => {
    dispatch(
      searchSlice.actions.setSearch({ search: valueInput.toLowerCase() }),
    );
  }, 300);

  const handleSearch = (e) => {
    const val = e.target.value.trim().toLowerCase()
    AppStore.update(s => {s.filter = val})
    setValue(e.target.value);
    debouncedDispatchInput(e.target.value);
  };

  const clearSearch = () => {
    if (value !== '') {
      setValue('');
      AppStore.update(s => {s.filter = ''})
      dispatch(searchSlice.actions.setSearch({ search: '' }));
      dispatch(
        searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }),
      );
    }
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
