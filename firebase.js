import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAFY1vrCyrXlQJKMaRgtXLGbu9UZgf9HK4",
  authDomain: "app-mobile-60ca6.firebaseapp.com",
  projectId: "app-mobile-60ca6",
  storageBucket: "app-mobile-60ca6.appspot.com",
  messagingSenderId: "992740498877",
  appId: "1:992740498877:web:b22b3b61bc6b772b3806d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db};


