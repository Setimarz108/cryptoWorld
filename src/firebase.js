import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyA9jtqQ-_f7nr1DK5bssZ-D7jM_2HfRafk",
  
    authDomain: "cryptoworld-bc7b8.firebaseapp.com",
  
    projectId: "cryptoworld-bc7b8",
  
    storageBucket: "cryptoworld-bc7b8.appspot.com",
  
    messagingSenderId: "23669075581",
  
    appId: "1:23669075581:web:5fec409676563054618b14",
  
    measurementId: "G-J4P69GZGFX"
  
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, db}