export const Message = (text, data, link) => {
  return `
    <div class='message'>
      <div class='message__img'>
        <img src='assets/placeholder.png' alt='placeholder'>
      </div>
      <div class='message__text'>
        ${text}
      </div>
      <a href='${link}' target='_blank'>Ссылка на сообщение</a>
      <span class='message__data'>
        ${data}
      </span>
    </div>
  `
}
