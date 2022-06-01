import styles from './Message.module.scss';

export const Message = (text, img, data, link, id) => {
  return `
    <div class=${styles.message} data-id=${id}>
      <div class=${styles.message__info}>
        <div class=${styles.text__wrapper}>
          ${img ? `<img src=${img} alt='preview'>` : ''}
          <p class=${styles.message__text}>
            ${text}
          </p>
        </div>
        ${link ? `<a href='${ link }' target='_blank'>Ссылка на сообщение</a>` : ''}
        <span class=${styles.message__data}>
          ${data}
        </span>
      </div>
    </div>
  `
}
