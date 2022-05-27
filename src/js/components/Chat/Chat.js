export const Chat = (img, title, description, id) => {
  const image = img ? img : '../../../assets/avatar.jpg';

  return `
  <div class='chat' data-id='${id}'>
    <div class='chat__logo'>
        <img src='${image}' alt='placeholder'>
    </div>
    <div class='chat__text-wrapper'>
        <span class='chat__title'>${title}</span>
        <p class='chat__description'>${description}</p>
    </div>
  </div>
`
}
