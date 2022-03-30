import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF7QtEwqf2nsw-ozd8HxzCY13h6idIsm8",
  authDomain: "crud-opps.firebaseapp.com",
  projectId: "crud-opps",
  storageBucket: "crud-opps.appspot.com",
  messagingSenderId: "907394254944",
  appId: "1:907394254944:web:18f36daeb2dd388b3b5b05",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
