// lib/AuthApi.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  UserCredential 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { createUserDocument, getUserById as fetchUserFromFirestore } from './firestoreService';

export interface User {
  uid: string;
  email: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

export class AuthApi {
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await this.getUserById(userCredential.user.uid);
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  }

  static async register(email: string, password: string, name: string): Promise<User> {
    try {
      // Create the user in Firebase Authentication
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Create user document in Firestore
      const userData: User = {
        uid,
        email,
        name
      };
      
      // Store user data in Firestore using our service
      await createUserDocument(userData);
      
      return userData;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Failed to register');
    }
  }

  static async getUserById(uid: string): Promise<User> {
    try {
      const userData = await fetchUserFromFirestore(uid);
      
      if (userData) {
        return userData;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      console.error('Get user error:', error);
      throw new Error(error.message || 'Failed to get user data');
    }
  }

  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }
}