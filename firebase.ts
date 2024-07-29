import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJGbGzkl4KJHZB6RrzXQWuVnPc2G8i_J8',
  authDomain: 'chat-with-pdf-project.firebaseapp.com',
  projectId: 'chat-with-pdf-project',
  storageBucket: 'chat-with-pdf-project.appspot.com',
  messagingSenderId: '454660332140',
  appId: '1:454660332140:web:dd0bef6ef45131af9c9649',
  measurementId: 'G-Y0ZDY7LFTX',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

