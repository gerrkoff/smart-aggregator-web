import { Header, InputContainer, Chats, Messages, Comments } from '../containers';
import { collection, addDoc } from 'firebase/firestore';
import { db, searchComponents } from './config';
import { insertChats } from './controllers/contentController';
import { componentToNode } from './utils';
import { addInputListeners } from './controllers/inputController';

import '../styles/styles.scss';

const render = () => {
  console.log('render starts')

  const main = document.querySelector('.main');
  const wrapper = document.querySelector('.wrapper');

  wrapper.prepend(componentToNode(InputContainer));
  wrapper.prepend(componentToNode(Header));
  main.append(componentToNode(Chats));
  main.append(componentToNode(Messages));
  main.append(componentToNode(Comments));

  searchComponents()
  addListeners()
  start();
}

const addListeners = () => {
  addInputListeners();
}

const start = async () => {
  console.log('DB starts')

  await insertChats(db);

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

render()
