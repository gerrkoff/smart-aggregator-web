import { insertMessages } from './messageController';
import { Chat } from '../../components';
import { getData } from '../utils';
import { CHATS_CONTAINER, CHATS_INFO_CONTAINER, MESSAGES_CONTAINER, db } from '../config';

let CHATS;
let CHATS_NODES;

const handleClickOnChat = async (e) => {
  const id = e.currentTarget.dataset.id;
  const selectedChat = CHATS.filter((chat) => String(chat.ChatId) === String(id))[0]
  CHATS_INFO_CONTAINER.innerHTML = Chat(selectedChat.LogoUrl, selectedChat.Title, selectedChat.Description, selectedChat.ChatId);

  CHATS_NODES?.forEach((item) => item.removeAttribute('active'));
  e.currentTarget.setAttribute('active', 'true')

  await insertMessages(db, id);

  MESSAGES_CONTAINER.scrollTop = 0;
}

const createChatTemplate = (chat) => {
  const template = document.createElement('template');
  template.innerHTML = Chat(chat.LogoUrl, chat.Title, chat.Description, chat.ChatId);
  template.content.firstElementChild.addEventListener('click', handleClickOnChat)

  return template.content.firstElementChild;
}


const filterChatsByDescription = (chats, value) => {
  const regex = value;
  return chats.filter((chat) => chat.Description.toLowerCase().match(regex))
}

export async function insertChats(db, value = null) {
  CHATS = await getData(db, 'chats');
  const fragment = document.createDocumentFragment();
  const filteredChats = value ? filterChatsByDescription(CHATS, value) : CHATS;

  filteredChats
    .sort((a, b) => b.CreateTime - a.CreateTime)
    .forEach((chat) => fragment.append(createChatTemplate(chat)));

  CHATS_CONTAINER.innerHTML = '';
  CHATS_CONTAINER.append(fragment);
  CHATS_NODES = CHATS_CONTAINER.querySelectorAll('[data-chat]')
}
