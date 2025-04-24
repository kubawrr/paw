import { ProjectDTO, Project } from "../types/UserStory";

export class ProjectService {
    private storageKey = 'userProjects';
    constructor() {
        if (typeof window !== 'undefined') {
          this.initializeStorage();
        }
      }
      private initializeStorage(): void {
        if (!localStorage.getItem(this.storageKey)) {
          localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
      }
       getAllProjects(): Project[] {
          try {
            if (typeof window === 'undefined') return [];
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
          } catch (error) {
            console.error('Error getting stories:', error);
            return [];
          }
        }
        createProject(projectData: ProjectDTO): ProjectDTO | null {
           try {
             const stories = this.getAllProjects();
             const newStory: Project = {
               ...projectData,
               id: this.generateId(),
             };
             
             stories.push(newStory);
             localStorage.setItem(this.storageKey, JSON.stringify(stories));
             return newStory;
           } catch (error) {
             console.error('Error creating story:', error);
             return null;
           }
         }

          updateStory(id: string, projectData: ProjectDTO): Project | null {
             try {
               const stories = this.getAllProjects();
               const index = stories.findIndex(p => p.id === id);
               
               if (index === -1) {
                 return null;
               }
               
               const updatedStory = {
                 ...stories[index],
                 ...projectData,
               };
               
               stories[index] = updatedStory;
               localStorage.setItem(this.storageKey, JSON.stringify(stories));
               return updatedStory;
             } catch (error) {
               console.error('Error updating story:', error);
               return null;
             }
           }
           deleteStory(id: string): boolean {
            try {
              const stories = this.getAllProjects();
              const filteredStories = stories.filter(p => p.id !== id);
              
              if (filteredStories.length === stories.length) {
                return false; // Nothing was deleted
              }
              
              localStorage.setItem(this.storageKey, JSON.stringify(filteredStories));
              return true;
            } catch (error) {
              console.error('Error deleting story:', error);
              return false;
            }
          }

         private generateId(): string {
            return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
          }
        
}
export const userProjectService = new ProjectService();