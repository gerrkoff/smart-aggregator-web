import React from 'react';
import styles from './Comments.module.scss';

export const Comments = () => {
  return (
    <div className={styles.comments}>
      <div className={styles.comments__layout} id='comments'></div>
    </div>
  )
}
