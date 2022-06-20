import { useEffect, useState } from 'react';
import { baseAPI } from '@api/baseAPI';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

type TChats = {}[] | null | Promise<DocumentData[]>;
type TMessages = {}[] | null | Promise<DocumentData[]>;

export const useApi = () => {
  const [chats, setChats] = useState<TChats>(null);
  const [messages, setMessages] = useState<TMessages>(null);

  useEffect(() => {
    baseAPI.getChats()
      .then((data) => {
        setChats(data)
      });
    baseAPI.getMessages()
      .then((data) => {
        setMessages(data)
      });
  }, [])

  return {
    messages,
    chats
  };
}
