"use client"
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // ensure correct import
import { UserStory, CreateUserStoryDTO, UpdateUserStoryDTO } from '../types/UserStory';
import { StoryApi } from '../lib/StoryApi';
import StoryForm from '../components/StoryForm';
import StoryCard from '../components/StoryCard';

const PROJECT_ID = '1'; // replace appropriately

export default function HistoryjkiPage() {

  const [stories, setStories] = useState<UserStory[]>([]);
  const [editingStory, setEditingStory] = useState<UserStory | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true);
        loadStories(); // only load stories after user is confirmed
      } else {
        console.warn('User is not authenticated.');
        // Optionally redirect to login or show message
      }
    });

    return () => unsubscribe();
  }, []);

  const loadStories = async () => {
    try {
      console.log(PROJECT_ID)
      const fetchedStories = await StoryApi.getStoriesByProject(PROJECT_ID);
      setStories(fetchedStories);
    } catch (error) {
      console.error('Error loading stories:', error);
    }
  };



  const handleCreateStory = () => {
    setEditingStory(null);
    setIsFormVisible(true);
  };

  const handleEditStory = (story: UserStory) => {
    setEditingStory(story);
    setIsFormVisible(true);
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await StoryApi.deleteStory(id);
        loadStories();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingStory(null);
  };

  const handleFormSubmit = () => {
    // Simple callback - just refresh the list and close the form
    // The form handles the API calls internally
    loadStories();
    setIsFormVisible(false);
    setEditingStory(null);
  };

  const todoStories = stories.filter(story => story.state === 'todo');
  const doingStories = stories.filter(story => story.state === 'doing');
  const doneStories = stories.filter(story => story.state === 'done');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Historyjki</h1>

      {!authReady ? (
        <p>Loading user...</p>
      ) : (
        <>
          <button
            onClick={handleCreateStory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
          >
            Dodaj nową historyjkę
          </button>

          {isFormVisible && (
            <StoryForm
              story={editingStory}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">To Do</h2>
              {todoStories.length === 0 ? (
                <p className="text-gray-500 italic">No stories</p>
              ) : (
                <div className="space-y-4">
                  {todoStories.map(story => (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      onEdit={() => handleEditStory(story)} 
                      onDelete={() => handleDeleteStory(story.id)} 
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Doing</h2>
              {doingStories.length === 0 ? (
                <p className="text-gray-500 italic">No stories</p>
              ) : (
                <div className="space-y-4">
                  {doingStories.map(story => (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      onEdit={() => handleEditStory(story)} 
                      onDelete={() => handleDeleteStory(story.id)} 
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Done</h2>
              {doneStories.length === 0 ? (
                <p className="text-gray-500 italic">No stories</p>
              ) : (
                <div className="space-y-4">
                  {doneStories.map(story => (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      onEdit={() => handleEditStory(story)} 
                      onDelete={() => handleDeleteStory(story.id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}