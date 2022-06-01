import { Chat, DateLabel, Message } from '../../components';
import { CHATS_CONTAINER, CHATS_INFO_CONTAINER, MESSAGES_CONTAINER, db, COMMENTS_CONTAINER } from '../config';
import { getData, getMessageLastTime, toDateFormat } from '../utils';
import { MessageFull } from '../../components/MessageFull/MessageFull';

let CHATS;
let CHATS_NODES;
let MESSAGES;
let LAST_MESSAGE;

const handleClickOnChat = async (e) => {
  const id = e.currentTarget.dataset.id;
  const selectedChat = CHATS.filter((chat) => String(chat.ChatId) === String(id))[0]
  CHATS_INFO_CONTAINER.innerHTML = Chat(selectedChat.LogoUrl, selectedChat.Title, selectedChat.Description, selectedChat.ChatId);

  CHATS_NODES?.forEach((item) => item.removeAttribute('active'));
  e.currentTarget.setAttribute('active', 'true')

  await insertMessages(db, id);

  MESSAGES_CONTAINER.scrollTop = 0;
}

const addToCommentsContainer = (e) => {
  if (e.target.nodeName !== 'A') {
    COMMENTS_CONTAINER.innerHTML = '';
    const message = MESSAGES.filter((mes) => String(mes.MessageId) === String(e.currentTarget.dataset.id))[0];
    COMMENTS_CONTAINER.innerHTML = MessageFull(message);
  }
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


const filterMessagesById = (messages, id) => {
  MESSAGES = messages.filter((message) => String(message.ChatId) === String(id));
  return MESSAGES;
}


const sortMessagesByTime = (messages) => {
  const messagesWithDate = {};
  const sortedMessages = messages.sort((a, b) => getMessageLastTime(b) - getMessageLastTime(a))

  sortedMessages.forEach((message) => {
    const data = getMessageLastTime(message);
    const day = new Date(data).toLocaleDateString();

    if (messagesWithDate[day]) {
      messagesWithDate[day].push(message);
    } else {
      messagesWithDate[day] = [];
      messagesWithDate[day].push(message);
    }
  })

  LAST_MESSAGE = sortedMessages[0];

  return messagesWithDate;
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


export async function insertMessages(db, id) {
  const messages = await getData(db, 'messages');
  const filteredMessages = sortMessagesByTime(filterMessagesById(messages, id));

  const result = Object.entries(filteredMessages)
    .map((item) => {
      const messages = item[1].map((mes) => Message(mes.Text, mes.PhotoUrl, toDateFormat(mes.EditTime, mes.CreateTime), mes.Link, mes.MessageId))
      return messages.concat(DateLabel(item[0]))
    })

  MESSAGES_CONTAINER.innerHTML = result.reduceRight((arr, res) => res.concat(arr)).join('');
  COMMENTS_CONTAINER.innerHTML = MessageFull(LAST_MESSAGE);

  const messagesComponents = MESSAGES_CONTAINER.querySelectorAll('[data-id]');
  messagesComponents.forEach((mes) => mes.addEventListener('click', addToCommentsContainer))
}
