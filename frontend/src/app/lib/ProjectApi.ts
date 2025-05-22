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
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Project, ProjectDTO } from '../types/UserStory';

export class ProjectApi {
  private static COLLECTION = 'projects';

  // Create a new project
  static async createProject(projectData: ProjectDTO): Promise<Project> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to create a project');
      }
      
      const newProject = {
        ...projectData,
        ownerId: user.uid,
        dateCreated: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, this.COLLECTION), newProject);
      ``
      return {
        id: docRef.id,
        nazwa: projectData.nazwa,
        opis: projectData.opis,
        ownerId: user.uid
      };
    } catch (error: any) {
      console.error('Create project error:', error);
      throw new Error(error.message || 'Failed to create project');
    }
  }

  // Get all projects for the current user
  static async getUserProjects(): Promise<Project[]> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to fetch projects');
      }
      
      const projectsQuery = query(
        collection(db, this.COLLECTION),
        where('ownerId', '==', user.uid)
      );

      const querySnapshot = await getDocs(projectsQuery);
      const projects: Project[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projects.push({
          id: doc.id,
          nazwa: data.nazwa,
          opis: data.opis,
          ownerId: data.ownerId
        });
      });
      
      return projects;
    } catch (error: any) {
      console.error('Get projects error:', error);
      throw new Error(error.message || 'Failed to fetch projects');
    }
  }

  // Get a project by ID (with owner check)
  static async getProjectById(projectId: string): Promise<Project | null> {
    try {
      console.log('getProjectById called with ID:', projectId);
      
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        console.log('User not authenticated');
        throw new Error('User must be authenticated to fetch a project');
      }
      
      console.log('Current user ID:', user.uid);
      
      // Try direct document access instead of query
      const docRef = doc(db, this.COLLECTION, projectId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.log('Project document does not exist');
        return null;
      }
      
      const data = docSnap.data();
      console.log('Project data retrieved:', data);
      
      // Check ownership - this might be redundant if security rules are properly set up
      // but it's good practice for verification
      if (data.ownerId !== user.uid) {
        console.log('Project ownership check failed');
        return null; // Don't throw error, just return null for non-owned projects
      }
      
      return {
        id: docSnap.id,
        nazwa: data.name,
        opis: data.description,
        ownerId: data.ownerId
      };
    } catch (error: any) {
      console.error('Get project by ID error:', error);
      console.error('Error details:', error.code, error.message);
      throw new Error(error.message || 'Failed to fetch project');
    }
  }

  // Update a project
  static async updateProject(projectId: string, projectData: ProjectDTO): Promise<Project | null> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to update a project');
      }
      
      // Get the existing project to check ownership
      const existingProject = await this.getProjectById(projectId);
      if (!existingProject) {
        return null;
      }
      
      const updateData = {
        ...projectData,
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, this.COLLECTION, projectId);
      await updateDoc(docRef, updateData);
      
      // Return updated project
      return {
        ...existingProject,
        ...projectData
      };
    } catch (error: any) {
      console.error('Update project error:', error);
      throw new Error(error.message || 'Failed to update project');
    }
  }

  // Delete a project
  static async deleteProject(projectId: string): Promise<boolean> {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User must be authenticated to delete a project');
      }
      
      // Get the existing project to check ownership
      const existingProject = await this.getProjectById(projectId);
      if (!existingProject) {
        return false;
      }
      
      await deleteDoc(doc(db, this.COLLECTION, projectId));
      return true;
    } catch (error: any) {
      console.error('Delete project error:', error);
      throw new Error(error.message || 'Failed to delete project');
    }
  }
}