import { CHATS_CONTAINER, db, INPUT, MESSAGES_CONTAINER } from './config';
import { insertChats } from './contentController';

const clearContainers = () => {
  CHATS_CONTAINER.textContent = '';
  MESSAGES_CONTAINER.textContent = '';
}

const handleSearch = async(e) => {
  const value = e.target.value;
  await insertChats(db, value);
  e.target.value = '';
}

INPUT.addEventListener('focus', clearContainers);
INPUT.addEventListener('blur', handleSearch);
