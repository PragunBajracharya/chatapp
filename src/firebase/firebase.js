import firebase from 'firebase/app';
import 'firebase/auth';
//import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDiEy_nDBndkY43nWBWOT3HM-cwDYyi_uU",
    authDomain: "facebook-messenger-clone-46284.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-46284.firebaseio.com",
    projectId: "facebook-messenger-clone-46284",
    storageBucket: "facebook-messenger-clone-46284.appspot.com",
    messagingSenderId: "46735540438",
    appId: "1:46735540438:web:4a7dac7c7118c95a884977"
});

export default app;