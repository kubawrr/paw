'use client';

import { useState, useEffect } from 'react';
import { Project } from '../types/UserStory';
import { userProjectService } from '../services/ProjectService';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

export default function ProjektyPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormVisiblePr, setIsFormVisiblePr] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = userProjectService.getAllProjects();
    setProjects(allProjects);
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsFormVisiblePr(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormVisiblePr(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      userProjectService.deleteStory(id);
      loadProjects();
    }
  };

  const handleFormCloseProject = () => {
    setIsFormVisiblePr(false);
    setEditingProject(null);
  };

  const handleFormSubmitProject = () => {
    loadProjects();
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
      
      <ProjectList 
        title='Projekty'
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}