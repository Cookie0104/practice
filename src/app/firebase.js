// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpwQ6xfBLxYa8_E4ScVtCum_Q4Rq7PSfk",
  authDomain: "practice-sst.firebaseapp.com",
  projectId: "practice-sst",
  storageBucket: "practice-sst.appspot.com",
  messagingSenderId: "213544011991",
  appId: "1:213544011991:web:e1ab7077680da4b1798892",
  measurementId: "G-FEM3WQVWE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const jsonData = {
  nickname: "anonymous",
  body: 30,
  createdAt: Date.now(),
  id: 1,
};

const docRef = doc(firestore, "users", "user1");

setDoc(docRef, jsonData)
  .then(() => {
    console.log("Data successfully uploaded to Firestore!");
  })
  .catch((error) => {
    console.error("Error uploading data: ", error);
  });

export const db = getDatabase(app);
