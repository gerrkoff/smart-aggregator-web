import { getData, getMessageLastTime, toDateFormat } from '../utils';
import { DateLabel, Message } from '../../components';
import { COMMENTS_CONTAINER, MESSAGES_CONTAINER } from '../config';
import { MessageFull } from '../../components/MessageFull/MessageFull';

let MESSAGES;
let LAST_MESSAGE;

const addToCommentsContainer = (e) => {
  if (e.target.nodeName !== 'A') {
    COMMENTS_CONTAINER.innerHTML = '';
    const message = MESSAGES.filter((mes) => String(mes.MessageId) === String(e.currentTarget.dataset.id))[0];
    COMMENTS_CONTAINER.innerHTML = MessageFull(message);
  }
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

const addListenerToMessages = () => {
  const messagesNodes = MESSAGES_CONTAINER.querySelectorAll('[data-id]');
  messagesNodes.forEach((mes) => mes.addEventListener('click', addToCommentsContainer))
}

export async function insertMessages(db, id) {
  const messages = await getData(db, 'messages');
  const messagesByIdAndTime = sortMessagesByTime(filterMessagesById(messages, id));

  const messagesToHTML = Object.entries(messagesByIdAndTime)
    .map((item) => {
      const messages = item[1].map((message) => Message(message))
      return messages.concat(DateLabel(item[0]))
    })

  MESSAGES_CONTAINER.innerHTML = messagesToHTML.reduceRight((arr, res) => res.concat(arr)).join('');
  COMMENTS_CONTAINER.innerHTML = MessageFull(LAST_MESSAGE);

  addListenerToMessages();
}
