import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAeBcF-vtMkV9eeYqLp-oy6xDASwV4pdzY",
    authDomain: "letmeask-9b328.firebaseapp.com",
    databaseURL: "https://letmeask-9b328-default-rtdb.firebaseio.com",
    projectId: "letmeask-9b328",
    storageBucket: "letmeask-9b328.appspot.com",
    messagingSenderId: "377173251259",
    appId: "1:377173251259:web:1ea43e0cf559bbc4dc859e"
};

firebase.initializeApp(firebaseConfig); 

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };