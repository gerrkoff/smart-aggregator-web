export const Chat = (img, title, description, id) => {
  return `
  <div class='chat' data-id='${id}'>
    <div class='chat__logo'>
        <img src='${img}' alt='placeholder'>
    </div>
    <div class='chat__text-wrapper'>
        <span class='chat__title'>${title}</span>
        <p class='chat__description'>${description}</p>
    </div>
  </div>
`
}
