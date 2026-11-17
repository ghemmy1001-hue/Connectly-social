import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsVVoyac11xZsmg-OJANwrOdD_2HuXBnA",
  authDomain: "connectly-media-f60d0.firebaseapp.com",
  projectId: "connectly-media-f60d0",
  storageBucket: "connectly-media-f60d0.firebasestorage.app",
  messagingSenderId: "756485725438",
  appId: "1:756485725438:web:225d4fc014f0fc388819af",
  measurementId: "G-XP6WX0HB2D"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const firebaseStorage = getStorage(app);
