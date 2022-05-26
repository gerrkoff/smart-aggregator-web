import { Chat, Message } from './components';
import { CHATS_CONTAINER, MESSAGES_CONTAINER, db } from './config';
import { getData, getMessageLastTime, toDateFormat } from './utils';

let CHATS;

const handleClickOnChat = async (e) => {
  const id = e.currentTarget.dataset.id;

  CHATS?.forEach((item) => item.classList.remove('active'));
  e.currentTarget.classList.add('active');

  await insertMessages(db, id);
}


const createChatTemplate = (chat) => {
  const template = document.createElement('template');
  template.innerHTML = Chat(chat.LogoUrl, chat.Title, chat.Description, chat.ChatId);
  template.content.firstElementChild.addEventListener('click', handleClickOnChat)

  return template.content.firstElementChild;
}


const filterChatsByDescription = (chats, value) => {
  return chats.filter((chat) => chat.Description.toLowerCase() === value.toLowerCase())
}


const filterMessagesById = (messages, id) => {
  return messages.filter((message) => String(message.ChatId) === String(id))
}


const sortMessagesByTime = (messages) => {
  return messages.sort((a, b) => getMessageLastTime(b) - getMessageLastTime(a));
}


export async function insertChats(db, value = null) {
  const chats = await getData(db, 'chats');
  const fragment = document.createDocumentFragment();
  const filteredChats = value ? filterChatsByDescription(chats, value) : chats;

  filteredChats.forEach((chat) => fragment.append(createChatTemplate(chat)));

  CHATS_CONTAINER.append(fragment);
  CHATS = CHATS_CONTAINER.querySelectorAll('.chat')
}


export async function insertMessages(db, id) {
  const messages = await getData(db, 'messages');
  const filteredMessages = sortMessagesByTime(filterMessagesById(messages, id));

  MESSAGES_CONTAINER.innerHTML = filteredMessages
    .map((message) => Message(message.Text, toDateFormat(message.EditTime, message.CreateTime), message.Link))
    .join('');
}
