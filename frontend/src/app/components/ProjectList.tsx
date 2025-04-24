import { Project } from '../types/UserStory';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  title: string;
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function StoryList({ title, projects, onEdit, onDelete }: ProjectListProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No stories</p>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={() => onEdit(project)} 
              onDelete={() => onDelete(project.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}