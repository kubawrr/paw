'use client';

import { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskState } from '../types/Task';
import { UserStory } from '../types/UserStory';
import { taskService } from '../services/TaskService';
import { userStoryService } from '../services/UserStoryService';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function TaskForm({ 
  task, 
  onSubmit, 
  onCancel 
}: TaskFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [state, setState] = useState<TaskState>(TaskState.TODO);
  const [userStoryId, setUserStoryId] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [userStories, setUserStories] = useState<UserStory[]>([]);

  useEffect(() => {
    // Load user stories for dropdown
    const stories = userStoryService.getAllStories();
    setUserStories(stories);

    // Populate form if editing existing task
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setPriority(task.priority);
      setState(task.state);
      setUserStoryId(task.userStoryId);
      setEstimatedTime(task.estimatedTime);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskToSave: Task = {
      id: task?.id,
      name,
      description,
      priority,
      state,
      userStoryId,
      estimatedTime,
      dateAdded: task?.dateAdded || new Date(),
      dateStarted: task?.dateStarted,
      dateCompleted: task?.dateCompleted,
      assignedUser: task?.assignedUser
    };

    taskService.addTask(taskToSave);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nazwa Zadania
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Opis Zadania
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Stan Zadania
        </label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value as TaskState)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {Object.values(TaskState).map(s => (
            <option key={s} value={s}>{
              s === TaskState.TODO ? 'Do zrobienia' : 
              s === TaskState.DOING ? 'W trakcie' : 
              'Zakończone'
            }</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Priorytet
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {Object.values(TaskPriority).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Historyjka
        </label>
        <select
          value={userStoryId}
          onChange={(e) => setUserStoryId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Wybierz historyjkę</option>
          {userStories.map(story => (
            <option key={story.id} value={story.id}>{story.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Przewidywany czas wykonania (godz.)
        </label>
        <input
          type="number"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {task ? 'Aktualizuj Zadanie' : 'Dodaj Zadanie'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}