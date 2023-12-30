import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAoSeWlbxiZkTcnH9DyP6_3Vuymui4kUW8",
//     authDomain: "proj01-515b5.firebaseapp.com",
//     projectId: "proj01-515b5",
//     storageBucket: "proj01-515b5.appspot.com",
//     messagingSenderId: "975546341885",
//     appId: "1:975546341885:web:4568c3db8ada0454476194",
//     measurementId: "G-R0NCEM6ZZ7"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCx3RroYJQTkXcJ7qUEqjfAwFusR7kMnWg",
    authDomain: "sip-firebase-9b589.firebaseapp.com",
    projectId: "sip-firebase-9b589",
    storageBucket: "sip-firebase-9b589.appspot.com",
    messagingSenderId: "1076834717658",
    appId: "1:1076834717658:web:c946e34cb5a460f50b7ae3",
    measurementId: "G-1D268B3DNE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gP = new GoogleAuthProvider();
export const db = getFirestore(app);
