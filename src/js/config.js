import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export let CHATS_CONTAINER;
export let CHATS_INFO_CONTAINER;
export let MESSAGES_CONTAINER;
export let COMMENTS_CONTAINER;
export let INPUT;
export let INPUT_BUTTON;

export const firebaseConfig = {
  projectId: 'smart-aggregator-350521',

  // apiKey: "API_KEY",
  // authDomain: "PROJECT_ID.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: "https://DATABASE_NAME.firebaseio.com",
  // storageBucket: "PROJECT_ID.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const searchComponents = () => {
  CHATS_CONTAINER = document.getElementById('chats');
  CHATS_INFO_CONTAINER = document.getElementById('chats-info');
  MESSAGES_CONTAINER = document.getElementById('messages');
  COMMENTS_CONTAINER = document.getElementById('comments');
  INPUT = document.getElementById('input');
  INPUT_BUTTON = document.getElementById('input-button');
}
