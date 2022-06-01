import styles from './Chat.module.scss';

export const Chat = (img, title, description, id) => {
  const image = img ? img : '../../../assets/avatar.jpg';

  return `
  <div class=${styles.chat} data-id='${id}' data-chat>
    <div class=${styles.chat__logo}>
        <img src='${image}' alt='placeholder'>
    </div>
    <div class=${styles.chat__text_wrapper}>
        <span class=${styles.chat__title}>${title}</span>
        <p class=${styles.chat__description} description>${description}</p>
    </div>
  </div>
`
}
