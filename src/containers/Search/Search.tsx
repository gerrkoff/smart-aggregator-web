import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { useRef } from 'react';

import { Input } from '@/components';

import { useClear } from './useClear';
import { useInput } from './useInput';

import styles from './Search.module.scss';

export const Search = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, changeHandler] = useInput();
  const clearHandler = useClear(ref);

  return (
    <div className={styles.search}>
      <Input ref={ref} defaultValue={value} onChange={changeHandler} placeholder="Поиск" />
      {value && <AiOutlineCloseCircle className={styles.close} onClick={clearHandler} />}
    </div>
  );
};
