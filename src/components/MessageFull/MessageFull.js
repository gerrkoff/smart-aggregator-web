import styles from './MessageFull.module.scss';
import { toDateFormat } from '../../js/utils';

export const MessageFull = ({ Text, Link, CreateTime, EditTime, PhotoUrl, VideoThumbUrl }) => {
  const image = PhotoUrl || VideoThumbUrl ? `<div class=${ styles.message__img }><img src=${ PhotoUrl || VideoThumbUrl } alt='placeholder'></div>` : ''
  return `
    <div class=${ styles.message }>
      ${ image }
      <div class=${ styles.message__info }>
        <p class=${ styles.message__text }>
          ${ Text }
        </p>
        ${ Link ? `<a href='${ Link }' class=${ styles.link } target='_blank'>Ссылка на сообщение</a>` : '' }
        <div class=${ styles.message__reactions }>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>Reaction</title>
                <path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM22.003 19.602l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855s-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398z"></path>
            </svg>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>Resend</title>
                <path d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z"></path>
            </svg>
        </div>
        <span class=${ styles.message__data }>
          ${ toDateFormat(CreateTime, EditTime) }
        </span>
      </div>
    </div>
  `
}
