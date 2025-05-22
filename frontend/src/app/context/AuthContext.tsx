// context/AuthContext.tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../lib/firebase';
import { AuthApi, User } from '../lib/AuthApi';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => { throw new Error('Not implemented'); },
  register: async () => { throw new Error('Not implemented'); },
  logout: async () => { throw new Error('Not implemented'); }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await AuthApi.getUserById(firebaseUser.uid);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userData = await AuthApi.getUserById(credential.user.uid);
  setCurrentUser(userData);
  return userData;
};


  const register = async (email: string, password: string, name: string) => {
    return AuthApi.register(email, password, name);
  };

 const logout = async () => {
  await signOut(auth);
  setCurrentUser(null);
};

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};