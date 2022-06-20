import React from 'react';
import styles from './Input.module.scss';

export const Input = ({ placeholder, id }) => {
  return (
    <input type='text' className={styles.input} placeholder={placeholder} id={id}/>
  )
}
