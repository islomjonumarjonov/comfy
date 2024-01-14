import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZI1Onim6N2GT7TxRlUIGrs0fEJbmzDhc",
  authDomain: "product-8d863.firebaseapp.com",
  projectId: "product-8d863",
  storageBucket: "product-8d863.appspot.com",
  messagingSenderId: "358584180499",
  appId: "1:358584180499:web:d5976f73461bd6cd1ec4e6",
  measurementId: "G-ZBR8Z23WVM",
};

const app = initializeApp(firebaseConfig);

//Installize
const auth = getAuth(app);
export { auth };
//

export const db = getFirestore(app);
