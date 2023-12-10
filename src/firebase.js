import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAGj-T1bz9690umSoRIslYwVeqpZJb_q1E",
    authDomain: "react-facebook-clone-yt.firebaseapp.com",
    projectId: "react-facebook-clone-yt",
    storageBucket: "react-facebook-clone-yt.appspot.com",
    messagingSenderId: "596170442842",
    appId: "1:596170442842:web:c0a6618c77e3eee12bf063"
  };

  initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  export { auth, db, storage };