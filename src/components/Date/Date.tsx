import styles from './Date.module.scss';

export const DateLabel = (date: string) => {
  return <div className={styles.date}>{date}</div>;
};
