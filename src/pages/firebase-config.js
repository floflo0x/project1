import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu78XBhtx20PeRFley_zDzaR_En19VFVQ",
  authDomain: "project1-fe4a0.firebaseapp.com",
  projectId: "project1-fe4a0",
  storageBucket: "project1-fe4a0.appspot.com",
  messagingSenderId: "712283351487",
  appId: "1:712283351487:web:97df7caa1347da35f5190a"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);