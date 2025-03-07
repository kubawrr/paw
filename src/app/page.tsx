"use client"
// pages/page.tsx

import { useState, useEffect } from 'react';
import { ProjectApi } from './lib/ProjectApi';
import { Project } from './models/Project';
import { UserManager } from './models/UserManager';
const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [nazwa, setNazwa] = useState('');
  const [opis, setOpis] = useState('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    UserManager.login('Test', 'Testt');
    setUserName(UserManager.getUserName());
  })  
  // Load projects from localStorage when the page is loaded
  const loadProjects = () => {
    const loadedProjects = ProjectApi.getProjects();
    setProjects(loadedProjects);
  };

  // Add a new project
  const addProject = () => {
    if (nazwa && opis) {
      const newProject = ProjectApi.createProject(nazwa, opis);
      setProjects((prev) => [...prev, newProject]);
      setNazwa('');
      setOpis('');
    }
  };

  // Delete a project
  const deleteProject = (id: string) => {
    const success = ProjectApi.deleteProject(id);
    if (success) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  // Update an existing project
  const updateProject = () => {
    if (nazwa && opis && editProjectId) {
      const updatedProject = ProjectApi.updateProject(editProjectId, nazwa, opis);
      if (updatedProject) {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editProjectId ? updatedProject : project
          )
        );
        setNazwa('');
        setOpis('');
        setEditMode(false);
        setEditProjectId(null);
      }
    }
  };

  // Start editing a project
  const startEditing = (project: Project) => {
    setNazwa(project.nazwa);
    setOpis(project.opis);
    setEditProjectId(project.id);
    setEditMode(true);
  };

  // Load projects when the page loads
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div>
      <h1>Projekty</h1>
      <h2>Zalogowany jako {userName}</h2>
      {/* Add/Update Project Form */}
      <div>
        <input
          type="text"
          placeholder="Nazwa"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />
        <textarea
          placeholder="Opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
        />
        {editMode ? (
          <button onClick={updateProject}>Zaktualizuj projekt</button>
        ) : (
          <button onClick={addProject}>Dodaj projekt</button>
        )}
      </div>

      {/* List of Projects */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.nazwa}</strong> - {project.opis}
            <button onClick={() => deleteProject(project.id)}>Usuń</button>
            <button onClick={() => startEditing(project)}>Edytuj</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
