// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg7jovJRaK0s6RWV2K6TzKYVDhUVpF2fs",
  authDomain: "react-flipkart-ad64e.firebaseapp.com",
  projectId: "react-flipkart-ad64e",
  storageBucket: "react-flipkart-ad64e.appspot.com",
  messagingSenderId: "54966341297",
  appId: "1:54966341297:web:841f53cb6af84e38cf9c90",
  measurementId: "G-0PXD2MN7ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;