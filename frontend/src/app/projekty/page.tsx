'use client';

import { useState, useEffect } from 'react';
import { Project } from '../types/UserStory';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import ProtectedRoute from '../components/ProtectedRoute';
import { ProjectApi } from '../lib/ProjectApi';
import { useAuth } from '../context/AuthContext';

export default function ProjektyPage() {
  const { currentUser, loading: authLoading } = useAuth(); // get auth state from context
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormVisiblePr, setIsFormVisiblePr] = useState(false);

    useEffect(() => {
    if (!authLoading && currentUser) {
      loadProjects();
    }
  }, [authLoading, currentUser]); 

  const loadProjects = async () => {
    try {
      const allProjects = await ProjectApi.getUserProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsFormVisiblePr(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormVisiblePr(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ProjectApi.deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleFormCloseProject = () => {
    setIsFormVisiblePr(false);
    setEditingProject(null);
  };

  const handleFormSubmitProject = async () => {
    await loadProjects();
    setIsFormVisiblePr(false);
    setEditingProject(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projekty</h1>

      <button 
        onClick={handleCreateProject}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Dodaj nowy projekt
      </button>

      {isFormVisiblePr && (
        <ProjectForm 
          project={editingProject}
          onSubmit={handleFormSubmitProject}
          onCancel={handleFormCloseProject}
        />
      )}

      <ProtectedRoute>
        <ProjectList 
          title="My Projects"
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </ProtectedRoute>
    </div>
  );
}
