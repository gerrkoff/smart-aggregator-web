import { CHATS_CONTAINER, db, INPUT, INPUT_BUTTON, MESSAGES_CONTAINER } from '../config';
import { insertChats } from './contentController';

const clearContainers = () => {
  CHATS_CONTAINER.textContent = '';
  MESSAGES_CONTAINER.textContent = '';
}

const setDefaultContainers = async () => {
  if (!INPUT.value) {
    await insertChats(db);
  }
}

const handleSearch = async () => {
  if (INPUT.value) {
    const value = INPUT.value;
    await insertChats(db, value);
    INPUT.value = '';
  }
}

INPUT.addEventListener('input', clearContainers);
INPUT.addEventListener('change', setDefaultContainers);
INPUT.addEventListener('blur', setDefaultContainers);
INPUT_BUTTON.addEventListener('click', handleSearch);
