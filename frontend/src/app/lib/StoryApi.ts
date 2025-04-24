// app/lib/StoryApi.ts
import { Story } from '../models/Story';

export class StoryApi {
  // Pobierz wszystkie historyjki z localStorage
  static getAllStories(projectId: string): Story[] {
    const stories = localStorage.getItem('stories');
    if (stories) {
      const parsedStories: Story[] = JSON.parse(stories);
      return parsedStories.filter(story => story.project === projectId);
    }
    return [];
  }

  // Stwórz nową historyjkę
  static createStory(story: Omit<Story, 'id' | 'createdAt'>): Story {
    const stories = this.getAllStories(story.project);
    const newStory: Story = {
      ...story,
      id: String(new Date().getTime()),  // Generowanie unikalnego ID na podstawie czasu
      createdAt: new Date().toISOString(),
    };
    stories.push(newStory);
    localStorage.setItem('stories', JSON.stringify(stories));
    return newStory;
  }

  // Zaktualizuj istniejącą historyjkę
  static updateStory(updatedStory: Story): Story {
    const stories = this.getAllStories(updatedStory.project);
    const index = stories.findIndex(story => story.id === updatedStory.id);
    if (index !== -1) {
      stories[index] = updatedStory;
      localStorage.setItem('stories', JSON.stringify(stories));
      return updatedStory;
    }
    throw new Error('Story not found');
  }

  // Usuń historyjkę
  static deleteStory(storyId: string, projectId: string): void {
    let stories = this.getAllStories(projectId);
    stories = stories.filter(story => story.id !== storyId);
    localStorage.setItem('stories', JSON.stringify(stories));
  }
}
