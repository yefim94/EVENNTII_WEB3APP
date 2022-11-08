import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {REACT_APP_API_KEY} from '@env'
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "business-68108.firebaseapp.com",
  projectId: "business-68108",
  storageBucket: "business-68108.appspot.com",
  messagingSenderId: "145110946260",
  appId: "1:145110946260:web:d4670accdcacc7e8f04641",
  measurementId: "G-7E1CZW9LGG"
};

const myApp = initializeApp(firebaseConfig);
export  const auth = getAuth();
export const user = auth.currentUser;
export function createUser (auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export default function signOutUser () {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  
}
export const db = getFirestore(myApp);
