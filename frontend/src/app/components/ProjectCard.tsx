import { Project } from '../types/UserStory'

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {  
    return (
      <div className={`bg-white rounded shadow p-4 `}>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{project.nazwa}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">{project.opis}</p>
        
        <div className="mt-3 text-xs text-gray-500">
          <p>Project: {project.nazwa}</p>
          <p>Description: {project.opis}</p>
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