import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOSTHlu2HBlbBi-DecPmcppVz5lGM6r0I",
  authDomain: "music-app-a5dfb.firebaseapp.com",
  databaseURL: "https://music-app-a5dfb-default-rtdb.firebaseio.com",
  projectId: "music-app-a5dfb",
  storageBucket: "music-app-a5dfb.appspot.com",  
  messagingSenderId: "642682835810",
  appId: "1:642682835810:web:12f26f4be2e2662811923b",
  measurementId: "G-R4H79VFYBF"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
