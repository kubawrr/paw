import { useState, useEffect } from 'react';
import { UserStory, Priority, State, CreateUserStoryDTO } from '../types/UserStory';
import { userStoryService } from '../services/UserStoryService';

interface StoryFormProps {
  story: UserStory | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function StoryForm({ story, onSubmit, onCancel }: StoryFormProps) {
  const [formData, setFormData] = useState<CreateUserStoryDTO>({
    name: '',
    description: '',
    priority: 'medium',
    project: '',
    state: 'todo',
    ownerId: '',
  });

  useEffect(() => {
    if (story) {
      setFormData({
        name: story.name,
        description: story.description,
        priority: story.priority,
        project: story.project,
        state: story.state,
        ownerId: story.ownerId,
      });
    }
  }, [story]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (story) {
      userStoryService.updateStory(story.id, formData);
    } else {
      userStoryService.createStory(formData);
    }
    
    onSubmit();
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {story ? 'Edit Story' : 'Add New Story'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nazwa
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Komentarz
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              required
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="project" className="block text-sm font-medium mb-1">
              Project ID
            </label>
            <input
              type="text"
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="ownerId" className="block text-sm font-medium mb-1">
              Owner ID
            </label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}