import { Project } from '../types/UserStory';
import ProjectCard from './ProjectCard';
import { useEffect, useState } from 'react';
import { ProjectApi } from '../lib/ProjectApi';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ProjectListProps {
  title: string;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({ title, onEdit, onDelete }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch their projects
        loadProjects();
      } else {
        // User is signed out, clear projects
        setProjects([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProjects = await ProjectApi.getUserProjects();
      console.log(fetchedProjects)
      setProjects(fetchedProjects);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await ProjectApi.deleteProject(id);
      if (success) {
        setProjects(projects.filter(project => project.id !== id));
      }
      onDelete(id);
    } catch (err: any) {
      console.error('Error deleting project:', err);
      setError(err.message || 'Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={loadProjects}
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
      
      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects</p>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={() => onEdit(project)} 
              onDelete={() => handleDelete(project.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
