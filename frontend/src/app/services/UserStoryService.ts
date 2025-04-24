import { UserStory, CreateUserStoryDTO, UpdateUserStoryDTO } from '../types/UserStory';

export class UserStoryService {
  private storageKey = 'userStories';

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

  getAllStories(): UserStory[] {
    try {
      if (typeof window === 'undefined') return [];
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (error) {
      console.error('Error getting stories:', error);
      return [];
    }
  }

  getStoriesByState(state: UserStory['state']): UserStory[] {
    const stories = this.getAllStories();
    return stories.filter(story => story.state === state);
  }

  getStoriesByProject(projectId: string): UserStory[] {
    const stories = this.getAllStories();
    return stories.filter(story => story.project === projectId);
  }

  getStoryById(id: string): UserStory | null {
    const stories = this.getAllStories();
    return stories.find(story => story.id === id) || null;
  }

  createStory(storyData: CreateUserStoryDTO): UserStory | null {
    try {
      const stories = this.getAllStories();
      const newStory: UserStory = {
        ...storyData,
        id: this.generateId(),
        dateCreated: new Date().toISOString(),
      };
      
      stories.push(newStory);
      localStorage.setItem(this.storageKey, JSON.stringify(stories));
      return newStory;
    } catch (error) {
      console.error('Error creating story:', error);
      return null;
    }
  }

  updateStory(id: string, storyData: UpdateUserStoryDTO): UserStory | null {
    try {
      const stories = this.getAllStories();
      const index = stories.findIndex(story => story.id === id);
      
      if (index === -1) {
        return null;
      }
      
      const updatedStory = {
        ...stories[index],
        ...storyData,
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
      const stories = this.getAllStories();
      const filteredStories = stories.filter(story => story.id !== id);
      
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

// Create a singleton instance
export const userStoryService = new UserStoryService();