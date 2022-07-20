import React from 'react';
import styles from './Date.module.scss';

export const DateLabel = (date) => {
  return (
    <div className={styles.date}>{date}</div>
  )
}
