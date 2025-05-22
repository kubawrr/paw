import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { UserStory, CreateUserStoryDTO, UpdateUserStoryDTO } from '../types/UserStory';
import { ProjectApi } from './ProjectApi';

export class StoryApi {
  private static COLLECTION = 'stories';

  // Create a new story
  static async createStory(storyData: CreateUserStoryDTO): Promise<UserStory> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to create a story');
      }
      
      // Skip project verification temporarily to debug main issue
      // const project = await ProjectApi.getProjectById(storyData.project);
      // if (!project) {
      //   throw new Error('Project not found or access denied');
      // }
      
      const newStory = {
        ...storyData,
        ownerId: user.uid,
        dateCreated: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, this.COLLECTION), newStory);
      
      return {
        id: docRef.id,
        name: storyData.name,
        description: storyData.description,
        priority: storyData.priority,
        project: storyData.project,
        dateCreated: new Date().toISOString(), // For immediate client-side use
        state: storyData.state,
        ownerId: user.uid
      };
    } catch (error: any) {
      console.error('Create story error:', error);
      throw new Error(error.message || 'Failed to create story');
    }
  }

  // TEMPORARY WORKAROUND: Get all stories for a specific project 
  // Without relying on ProjectApi.getProjectById
  static async getStoriesByProject(projectId: string): Promise<UserStory[]> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to fetch stories');
      }
      console.log('getStoriesByProject - current user:', user.uid);
      console.log('getStoriesByProject - projectId:', projectId);
      
      // Skip the project ownership verification for now
      // as that seems to be causing the issue
      
      // Try a simple query first
      try {
        // Use a simple query with just one condition first
        const simpleQuery = query(
          collection(db, this.COLLECTION),
          where('ownerId', '==', user.uid),
          where('project', '==', projectId)
        );
        
        const querySnapshot = await getDocs(simpleQuery);
        const stories: UserStory[] = [];
        
        // Filter results client-side to ensure we only see stories
        // that belong to the current user
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.ownerId === user.uid) {
            stories.push({
              id: doc.id,
              name: data.name,
              description: data.description,
              priority: data.priority,
              project: data.project,
              dateCreated: data.dateCreated?.toDate?.() 
                ? data.dateCreated.toDate().toISOString() 
                : new Date().toISOString(),
              state: data.state,
              ownerId: data.ownerId
            });
          }
        });
        
        console.log(`Found ${stories.length} stories for project after client filtering`);
        return stories;
      } catch (queryError) {
        console.error('Simple query failed:', queryError);
        
        // FALLBACK: If even the simple query fails, try to get all user's stories
        // and filter by project client-side
        const userStoriesQuery = query(
          collection(db, this.COLLECTION),
          where('ownerId', '==', user.uid),
          limit(100)  // Add a reasonable limit
        );
        
        const querySnapshot = await getDocs(userStoriesQuery);
        const stories: UserStory[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.project === projectId) {
            stories.push({
              id: doc.id,
              name: data.name,
              description: data.description,
              priority: data.priority,
              project: data.project,
              dateCreated: data.dateCreated?.toDate?.() 
                ? data.dateCreated.toDate().toISOString() 
                : new Date().toISOString(),
              state: data.state,
              ownerId: data.ownerId
            });
          }
        });
        
        console.log(`Found ${stories.length} stories for project using fallback approach`);
        return stories;
      }
    } catch (error: any) {
      console.error('Get stories error:', error);
      throw new Error(error.message || 'Failed to fetch stories');
    }
  }

  // Get a story by ID (with owner check)
  static async getStoryById(storyId: string): Promise<UserStory | null> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to fetch a story');
      }
      
      const docRef = doc(db, this.COLLECTION, storyId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      const data = docSnap.data();
      
      // Simple ownership check
      if (data.ownerId !== user.uid) {
        return null;
      }
      
      return {
        id: docSnap.id,
        name: data.name,
        description: data.description,
        priority: data.priority,
        project: data.project,
        dateCreated: data.dateCreated?.toDate?.() 
          ? data.dateCreated.toDate().toISOString() 
          : new Date().toISOString(),
        state: data.state,
        ownerId: data.ownerId
      };
    } catch (error: any) {
      console.error('Get story by ID error:', error);
      throw new Error(error.message || 'Failed to fetch story');
    }
  }

  // Update a story
  static async updateStory(storyId: string, storyData: UpdateUserStoryDTO): Promise<UserStory | null> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update a story');
      }
      
      // Get the existing story to check ownership
      const existingStory = await this.getStoryById(storyId);
      if (!existingStory) {
        return null;
      }
      
      // Skip project verification for now
      
      const updateData = {
        ...storyData,
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, this.COLLECTION, storyId);
      await updateDoc(docRef, updateData);
      
      // Return updated story
      return {
        ...existingStory,
        ...storyData
      };
    } catch (error: any) {
      console.error('Update story error:', error);
      throw new Error(error.message || 'Failed to update story');
    }
  }

  // Delete a story
  static async deleteStory(storyId: string): Promise<boolean> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete a story');
      }
      
      // Get the existing story to check ownership
      const existingStory = await this.getStoryById(storyId);
      if (!existingStory) {
        return false;
      }
      
      await deleteDoc(doc(db, this.COLLECTION, storyId));
      return true;
    } catch (error: any) {
      console.error('Delete story error:', error);
      throw new Error(error.message || 'Failed to delete story');
    }
  }
}