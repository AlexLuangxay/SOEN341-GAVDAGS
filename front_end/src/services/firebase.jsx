// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaTx2Bb3ClDyIadIuI-EbV3FYhVb6UwL0",
  authDomain: "gavdags-4878b.firebaseapp.com",
  projectId: "gavdags-4878b",
  storageBucket: "gavdags-4878b.firebasestorage.app",
  messagingSenderId: "542669964123",
  appId: "1:542669964123:web:97dc5b0f850b66d317907e",
  databaseURL: "https://gavdags-4878b.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();


export {auth, firestore, firebase};