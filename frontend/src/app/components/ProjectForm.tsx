import { useState, useEffect } from 'react';
import { Project,  ProjectDTO } from '../types/UserStory';
import { userProjectService } from '../services/ProjectService';

interface ProjectFormProps {
  project: Project | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {

    const [formData, setFormData] = useState<ProjectDTO>({
        nazwa: '',
        opis: '',
      });
      useEffect(() => {
        if (project) {
          setFormData({
            nazwa: project.nazwa,
            opis: project.opis,
          });
        }
      }, [project]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (project) {
            userProjectService.updateStory(project.id, formData);
        } else {
            userProjectService.createProject(formData);
        }
        
        onSubmit();
      };
      return (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {project ? 'Edytuj Projekt' : 'Dodaj nowy projekt'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nazwa
              </label>
              <input
                type="text"
                id="name"
                name="nazwa"
                value={formData.nazwa}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Opis
              </label>
              <textarea
                id="description"
                name="opis"
                value={formData.opis}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
}