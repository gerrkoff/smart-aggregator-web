import { FormEventHandler, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components';
import { useAppDispatch } from '@/store/hooks';
import { searchSlice } from '@/store/search';
import { SEARCH_STATUS } from '@/types';

import styles from './Search.module.scss';

export const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const debouncedDispatchInput = useDebouncedCallback((valueInput: string) => {
    dispatch(searchSlice.actions.setSearch({ search: valueInput.toLowerCase() }));
  }, 300);

  const handleSearch: FormEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    debouncedDispatchInput(e.currentTarget.value);
  };

  const clearSearch = () => {
    if (value !== '') {
      setValue('');
      dispatch(searchSlice.actions.setSearch({ search: '' }));
      dispatch(searchSlice.actions.setInputStatus({ status: SEARCH_STATUS.default }));
    }
  };

  return (
    <div className={styles.search}>
      <Input placeholder="Поиск" id="input" value={value} onChange={handleSearch} />
      <AiOutlineCloseCircle className={styles.close} onClick={clearSearch} />
    </div>
  );
};
