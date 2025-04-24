import { UserStory } from '../types/UserStory';

interface StoryCardProps {
  story: UserStory;
  onEdit: () => void;
  onDelete: () => void;
}

export default function StoryCard({ story, onEdit, onDelete }: StoryCardProps) {
  const priorityClasses = {
    low: 'border-l-4 border-blue-500',
    medium: 'border-l-4 border-yellow-500',
    high: 'border-l-4 border-red-500'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded shadow p-4 ${priorityClasses[story.priority]}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{story.name}</h3>
        <span className={`text-xs px-2 py-1 rounded ${
          story.priority === 'high' ? 'bg-red-100 text-red-800' : 
          story.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {story.priority.charAt(0).toUpperCase() + story.priority.slice(1)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">{story.description}</p>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>Project: {story.project}</p>
        <p>Owner: {story.ownerId}</p>
        <p>Created: {formatDate(story.dateCreated)}</p>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button 
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
        >
          Edit
        </button>
        <button 
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}