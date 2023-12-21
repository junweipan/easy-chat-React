import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC00oH2HbfPqzpR5IlP0BrvR6JW0C7xPDQ",
  authDomain: "react-chat-cc4d8.firebaseapp.com",
  databaseURL: "https://react-chat-cc4d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-cc4d8",
  storageBucket: "react-chat-cc4d8.appspot.com",
  messagingSenderId: "1039910830045",
  appId: "1:1039910830045:web:5019b570f717d00c648034",
  measurementId: "G-2QGQ8GT2VV"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);