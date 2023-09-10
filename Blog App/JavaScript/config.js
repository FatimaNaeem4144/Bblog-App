

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // signOut,
  // reauthenticateWithCredential,
  // EmailAuthProvider,
  // updatePassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

import {
  getDatabase,
  set,ref,update
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

import {
  // getStorage,
  // uploadBytesResumable,
  // getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';


  const firebaseConfig = {
  apiKey: "AIzaSyC72wEpSm8gwxBrbUMDeSvwMCGbyTOt4wU",
  authDomain: "hackathon-db212.firebaseapp.com",
  projectId: "hackathon-db212",
  storageBucket: "hackathon-db212.appspot.com",
  messagingSenderId: "85198307551",
  appId: "1:85198307551:web:8a4f31c4aa5790d825e96a",
  measurementId: "G-YYYXTR87G7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
// const storage = getStorage();

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  database,
  set,ref,update,
  // signOut,
  // doc,
  // setDoc,
  // db,
  // getDoc,
  // updateDoc,
  // getStorage,
  // storage,
  // uploadBytesResumable,
  // getDownloadURL,
  // reauthenticateWithCredential,
  // EmailAuthProvider,
  // updatePassword,
  // serverTimestamp,
  // query,
  // where,
  // getDocs,
  // deleteDoc
};