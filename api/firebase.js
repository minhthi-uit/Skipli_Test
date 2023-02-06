import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey : "AIzaSyAqMBkiNDjL3De82IKqLG2LQpqwbsOQbD4" , 
  authDomain : "skipli-test-a2f9c.firebaseapp.com" , 
  projectId : "skipli-test-a2f9c" , 
  storageBucket : "skipli-test-a2f9c.appspot.com" , 
  messagingSenderId : "506353389405" , 
  appId : "1:506353389405:web:4470e26daa148f9df522b4" , 
  measurementId : "G-S4JM4MRKZG" 
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);
// const db = firebase.firestore();
export {db};

