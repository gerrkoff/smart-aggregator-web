import React from 'react';
import { Button, Input } from '@components';

import styles from './Search.module.scss';

export const Search = () => {
  return (
    <div className={styles.input}>
      <Input placeholder='Поиск' id='input'/>
      <Button text='Поиск' id='input-button'/>
    </div>
  )
}
