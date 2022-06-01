import styles from './Date.module.scss';

export const DateLabel = (date) => {
  return `<div class=${styles.date}>${date}</div>`
}
