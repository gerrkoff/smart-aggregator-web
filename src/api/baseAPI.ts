import { db } from '@api/config';
import { collection, getDocs } from 'firebase/firestore';

class BaseAPI {
  getChats = async () => {
    return await this.getData(db, 'chats');
  }

  getMessages = async () => {
    return await this.getData(db, 'messages');
  }

  getData = async (db, name) => {
    const querySnapshot = await getDocs(collection(db, name));
    return querySnapshot.docs.map((x) => x.data());
  }
}

export const baseAPI = new BaseAPI();
