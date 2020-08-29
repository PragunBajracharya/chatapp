import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDiEy_nDBndkY43nWBWOT3HM-cwDYyi_uU",
    authDomain: "facebook-messenger-clone-46284.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-46284.firebaseio.com",
    projectId: "facebook-messenger-clone-46284",
    storageBucket: "facebook-messenger-clone-46284.appspot.com",
    messagingSenderId: "46735540438",
    appId: "1:46735540438:web:4a7dac7c7118c95a884977"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const githubOAuth = new firebase.auth.GithubAuthProvider();

const facebookOAuth = new firebase.auth.FacebookAuthProvider();

const googleOAuth = new firebase.auth.GoogleAuthProvider();

export default db;
export {auth, githubOAuth, facebookOAuth, googleOAuth};