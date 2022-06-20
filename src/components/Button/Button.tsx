import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ text, id }) => {
  return (
    <button className={styles.button} type='submit' id={id}>{text}</button>
  )
}
