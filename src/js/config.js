import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export const CHATS_CONTAINER = document.getElementById('chats');
export const MESSAGES_CONTAINER = document.getElementById('messages');
export const INPUT = document.getElementById('input');
