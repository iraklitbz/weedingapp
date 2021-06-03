import firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCMw8EbSQwf-lVau0pqQQ-lGQIP8kblzXQ",
  authDomain: "bodaapp-548ed.firebaseapp.com",
  projectId: "bodaapp-548ed",
  storageBucket: "bodaapp-548ed.appspot.com",
  messagingSenderId: "532667996787",
  appId: "1:532667996787:web:7060e2d1854476a3dca806"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
