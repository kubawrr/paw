// components/StoryList.tsx
import { UserStory } from '../types/UserStory';
import StoryCard from './StoryCard';
import { useEffect, useState } from 'react';
import {StoryApi} from '../lib/StoryApi';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface StoryListProps {
  title: string;
  projectId: string;
  onEdit: (story: UserStory) => void;
  onDelete: (id: string) => void;
}

export default function StoryList({ title, projectId, onEdit, onDelete }: StoryListProps) {
  const [stories, setStories] = useState<UserStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && projectId) {
        loadStories();
      } else {
        setStories([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [projectId]);

  const loadStories = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const fetchedStories = await StoryApi.getStoriesByProject(projectId);
      setStories(fetchedStories);
    } catch (err: any) {
      setError(err.message || 'Failed to load stories');
      console.error('Error loading stories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await StoryApi.deleteStory(id);
      if (success) {
        setStories(stories.filter(story => story.id !== id));
      }
      onDelete(id);
    } catch (err: any) {
      console.error('Error deleting story:', err);
      setError(err.message || 'Failed to delete story');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-500">Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={loadStories}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {stories.length === 0 ? (
        <p className="text-gray-500 italic">No stories</p>
      ) : (
        <div className="space-y-4">
          {stories.map(story => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onEdit={() => onEdit(story)} 
              onDelete={() => handleDelete(story.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}