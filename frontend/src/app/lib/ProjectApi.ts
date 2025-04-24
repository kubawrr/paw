// lib/ProjectApi.ts
import { Project } from '../models/Project';

export class ProjectApi {
  // Klucz w localStorage do przechowywania projektów
  private static STORAGE_KEY = 'projects';

  // Pomocnicza metoda do pobrania projektów z localStorage
  private static getProjectsFromStorage(): Project[] {
    const projects = localStorage.getItem(ProjectApi.STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  // Pomocnicza metoda do zapisania projektów do localStorage
  private static saveProjectsToStorage(projects: Project[]): void {
    localStorage.setItem(ProjectApi.STORAGE_KEY, JSON.stringify(projects));
  }

  // CREATE - Dodanie nowego projektu
  static createProject(nazwa: string, opis: string): Project {
    const projects = ProjectApi.getProjectsFromStorage();
    const newProject: Project = {
      id: new Date().toISOString(), // ID na podstawie daty
      nazwa,
      opis,
    };
    projects.push(newProject);
    ProjectApi.saveProjectsToStorage(projects);
    return newProject;
  }

  // READ - Pobranie wszystkich projektów
  static getProjects(): Project[] {
    return ProjectApi.getProjectsFromStorage();
  }

  // READ - Pobranie projektu po ID
  static getProjectById(id: string): Project | undefined {
    const projects = ProjectApi.getProjectsFromStorage();
    return projects.find(project => project.id === id);
  }

  // UPDATE - Aktualizacja projektu
  static updateProject(id: string, nazwa: string, opis: string): Project | null {
    const projects = ProjectApi.getProjectsFromStorage();
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      const updatedProject: Project = {
        id,
        nazwa,
        opis,
      };
      projects[projectIndex] = updatedProject;
      ProjectApi.saveProjectsToStorage(projects);
      return updatedProject;
    }
    return null;
  }

  // DELETE - Usunięcie projektu
  static deleteProject(id: string): boolean {
    let projects = ProjectApi.getProjectsFromStorage();
    const initialLength = projects.length;
    projects = projects.filter(project => project.id !== id);
    if (projects.length < initialLength) {
      ProjectApi.saveProjectsToStorage(projects);
      return true;
    }
    return false;
  }
}
