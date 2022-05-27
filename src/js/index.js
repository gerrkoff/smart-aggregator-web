import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';
import { insertChats } from './controllers/contentController';
import './controllers/inputController';

import '../styles/styles.css';

(async function () {
  console.log('start')
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
})();
