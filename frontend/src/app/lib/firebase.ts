import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVlNc4w47V5IeZWsqNMjGveORPFuM0T7U",
    authDomain: "manageme-893d5.firebaseapp.com",
    projectId: "manageme-893d5",
    storageBucket: "manageme-893d5.firebasestorage.app",
    messagingSenderId: "248532750678",
    appId: "1:248532750678:web:d594d02c7f5eb7feac86f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };