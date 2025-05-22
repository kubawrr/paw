// lib/firestoreService.ts
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  updateDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from './AuthApi';
import { Project } from '../models/Project';
import { Story } from '../models/Story';
// User Collection Operations
export const createUserDocument = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    ...user,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getUserById = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  if (userDoc.exists()) {
    return userDoc.data() as User;
  } else {
    return null;
  }
};

// Project Collection Operations
export const createProject = async (project: Omit<Project, 'id'>, userId: string): Promise<Project> => {
  const projectRef = collection(db, 'projects');
  const newProject = {
    ...project,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(projectRef, newProject);
  return { 
    id: docRef.id,
    ...project
  };
};

export const getProjectById = async (projectId: string): Promise<Project | null> => {
  const projectDoc = await getDoc(doc(db, 'projects', projectId));
  
  if (projectDoc.exists()) {
    const data = projectDoc.data();
    return { 
      id: projectDoc.id,
      ...data as Omit<Project, 'id'> 
    };
  } else {
    return null;
  }
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('createdBy', '==', userId), orderBy('createdAt', 'desc'));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Project, 'id'>
  }));
};

export const updateProject = async (projectId: string, project: Partial<Project>): Promise<void> => {
  const projectRef = doc(db, 'projects', projectId);
  await updateDoc(projectRef, {
    ...project,
    updatedAt: serverTimestamp()
  });
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await deleteDoc(doc(db, 'projects', projectId));
};

// Story Collection Operations
export const createStory = async (story: Omit<Story, 'id' | 'createdAt'>, userId: string): Promise<Story> => {
  const storyRef = collection(db, 'stories');
  const now = new Date().toISOString();
  
  const newStory = {
    ...story,
    createdAt: now,
    ownerId: userId,
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(storyRef, newStory);
  return { 
    id: docRef.id,
    ...newStory
  };
};

export const getStoryById = async (storyId: string): Promise<Story | null> => {
  const storyDoc = await getDoc(doc(db, 'stories', storyId));
  
  if (storyDoc.exists()) {
    const data = storyDoc.data();
    return { 
      id: storyDoc.id,
      ...data as Omit<Story, 'id'> 
    };
  } else {
    return null;
  }
};

export const getProjectStories = async (projectId: string): Promise<Story[]> => {
  const storiesRef = collection(db, 'stories');
  const q = query(storiesRef, where('project', '==', projectId), orderBy('createdAt', 'desc'));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Story, 'id'>
  }));
};

export const getUserStories = async (userId: string): Promise<Story[]> => {
  const storiesRef = collection(db, 'stories');
  const q = query(storiesRef, where('ownerId', '==', userId), orderBy('createdAt', 'desc'));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Story, 'id'>
  }));
};

export const updateStory = async (storyId: string, story: Partial<Story>): Promise<void> => {
  const storyRef = doc(db, 'stories', storyId);
  await updateDoc(storyRef, {
    ...story,
    updatedAt: serverTimestamp()
  });
};

export const deleteStory = async (storyId: string): Promise<void> => {
  await deleteDoc(doc(db, 'stories', storyId));
};