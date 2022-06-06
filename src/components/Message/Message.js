import styles from './Message.module.scss';
import { toDateFormat } from '../../js/utils';

export const Message = ({Text, PhotoUrl, EditTime, CreateTime, Link, MessageId}) => {
  const data = toDateFormat(EditTime, CreateTime);

  return `
    <div class=${styles.message} data-id=${MessageId}>
      <div class=${styles.message__info}>
        <div class=${styles.text__wrapper}>
          ${PhotoUrl ? `<img src=${PhotoUrl} alt='preview'>` : ''}
          <p class=${styles.message__text}>
            ${Text}
          </p>
        </div>
        ${Link ? `<a href='${ Link }' class=${styles.link} target='_blank'>Ссылка на сообщение</a>` : ''}
        <span class=${styles.message__data}>
          ${data}
        </span>
      </div>
    </div>
  `
}
