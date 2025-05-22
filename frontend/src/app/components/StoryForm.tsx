import { useState, useEffect } from 'react';
import { UserStory, Priority, State, CreateUserStoryDTO, UpdateUserStoryDTO } from '../types/UserStory';
import { StoryApi } from '../lib/StoryApi';
import { auth } from '../lib/firebase';

interface StoryFormProps {
  story: UserStory | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const PROJECT_ID = '1'; // Should match your main component

export default function StoryForm({ story, onSubmit, onCancel }: StoryFormProps) {
  const [formData, setFormData] = useState<CreateUserStoryDTO>({
    name: '',
    description: '',
    priority: 'medium',
    project: PROJECT_ID,
    state: 'todo',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (story) {
      setFormData({
        name: story.name,
        description: story.description,
        priority: story.priority,
        project: story.project,
        state: story.state,
      });
    } else {
      // Reset form for new story
      setFormData({
        name: '',
        description: '',
        priority: 'medium',
        project: PROJECT_ID,
        state: 'todo',
      });
    }
    setError(null);
  }, [story]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Story name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      if (story) {
        // Update existing story
        const updateData: UpdateUserStoryDTO = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          priority: formData.priority,
          state: formData.state,
        };
        await StoryApi.updateStory(story.id, updateData);
      } else {
        // Create new story
        const createData: CreateUserStoryDTO = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          priority: formData.priority,
          project: formData.project,
          state: formData.state,
        };
        await StoryApi.createStory(createData);
      }
      
      // Call parent's onSubmit callback
      onSubmit();
    } catch (err: any) {
      setError(err.message || 'Failed to save story');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {story ? 'Edit Story' : 'Add New Story'}
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nazwa *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Komentarz *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priorytet
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">
              Stan
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="project" className="block text-sm font-medium mb-1">
            Project ID
          </label>
          <input
            type="text"
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            required
            readOnly={!!story} // Make readonly when editing
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}