import { UserStory } from '../types/UserStory';
import StoryCard from './StoryCard';

interface StoryListProps {
  title: string;
  stories: UserStory[];
  onEdit: (story: UserStory) => void;
  onDelete: (id: string) => void;
}

export default function StoryList({ title, stories, onEdit, onDelete }: StoryListProps) {
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
              onDelete={() => onDelete(story.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}