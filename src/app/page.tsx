'use client';

import { useState, useEffect } from 'react';
import { UserStory, Priority, State } from './types/UserStory';
import { Project  } from './types/UserStory'
import { ProjectService, userProjectService } from './services/ProjectService';
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import { userStoryService } from './services/UserStoryService';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';

export default function Home() {
  const [stories, setStories] = useState<UserStory[]>([]);
  const [editingStory, setEditingStory] = useState<UserStory | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormVisiblePr, setIsFormVisiblePr] = useState(false);

  useEffect(() => {
    loadStories();
    loadProjects();
  }, []);

  const loadStories = () => {
    const allStories = userStoryService.getAllStories();
    setStories(allStories);
  };
  const loadProjects = () => {
    const allProjects = userProjectService.getAllProjects();
    setProjects(allProjects)
  }

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsFormVisiblePr(true);
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormVisible(true);
  }
  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
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

  const handleCreateStory = () => {
    setEditingStory(null);
    setIsFormVisible(true);
  };

  const handleEditStory = (story: UserStory) => {
    setEditingStory(story);
    setIsFormVisible(true);
  };

  const handleDeleteStory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      userStoryService.deleteStory(id);
      loadStories();
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingStory(null);
  };

  const handleFormSubmit = () => {
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
        <StoryList 
          title="To Do" 
          stories={todoStories} 
          onEdit={handleEditStory} 
          onDelete={handleDeleteStory} 
        />
        
        <StoryList 
          title="Doing" 
          stories={doingStories} 
          onEdit={handleEditStory} 
          onDelete={handleDeleteStory} 
        />
        
        <StoryList 
          title="Done" 
          stories={doneStories} 
          onEdit={handleEditStory} 
          onDelete={handleDeleteStory} 
        />
      </div>
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