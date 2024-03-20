
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA0wc4Wd35KfjHvEH69MJkUdkhlFMRM-Zg",
  authDomain: "yachthaven-f588e.firebaseapp.com",
  projectId: "yachthaven-f588e",
  storageBucket: "yachthaven-f588e.appspot.com",
  messagingSenderId: "516684670659",
  appId: "1:516684670659:web:c30ef7359316c652056476",
  measurementId: "G-XNH498VHDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth }
