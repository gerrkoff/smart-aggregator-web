import styles from './Button.module.scss';

export const Button = (text, id) => {
  return `<button class=${styles.button} type='submit' id=${id}>${text}</button>`
}
