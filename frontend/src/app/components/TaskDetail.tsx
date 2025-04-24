'use client';

import { useState, useEffect } from 'react';
import { Task, TaskState, UserRole } from '../types/Task';
import { taskService } from '../services/TaskService';
import { userStoryService } from '../services/UserStoryService';

interface TaskDetailProps {
  taskId: string;
  onClose: () => void;
}

export default function TaskDetail({ taskId, onClose }: TaskDetailProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [assignedUser, setAssignedUser] = useState<{
    id: string;
    name: string;
    role: UserRole;
  } | null>(null);

  useEffect(() => {
    const fetchedTask = taskService.getTaskById(taskId);
    if (fetchedTask) {
      setTask(fetchedTask);
      setAssignedUser(fetchedTask.assignedUser || null);
    }
  }, [taskId]);

  if (!task) return null;

  const userStory = userStoryService.getAllStories().find(story => story.id === task.userStoryId);

  const handleAssignUser = () => {
    const name = prompt('Podaj imię użytkownika:');
    const role = prompt('Wybierz rolę (developer/devops):') as UserRole;

    if (name && (role === UserRole.DEVELOPER || role === UserRole.DEVOPS)) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        role
      };

      taskService.assignUserToTask(taskId, user);
      
      // Refresh task data
      const updatedTask = taskService.getTaskById(taskId);
      if (updatedTask) {
        setTask(updatedTask);
        setAssignedUser(updatedTask.assignedUser || null);
      }
    } else {
      alert('Nieprawidłowe dane użytkownika');
    }
  };

  const handleCompleteTask = () => {
    if (task.state === TaskState.DOING && assignedUser) {
      taskService.completeTask(taskId);
      
      // Refresh task data
      const updatedTask = taskService.getTaskById(taskId);
      if (updatedTask) {
        setTask(updatedTask);
      }
    } else {
      alert('Zadanie musi być w trakcie realizacji i mieć przypisanego użytkownika');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          Zamknij
        </button>

        <h2 className="text-2xl font-bold mb-4">{task.name}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Opis:</h3>
            <p>{task.description}</p>

            <h3 className="font-semibold mt-4">Priorytet:</h3>
            <p>{task.priority}</p>

            <h3 className="font-semibold mt-4">Stan:</h3>
            <p>{task.state}</p>
          </div>

          <div>
            <h3 className="font-semibold">Historyjka:</h3>
            <p>{userStory?.name || 'Brak historyjki'}</p>

            <h3 className="font-semibold mt-4">Przewidywany czas:</h3>
            <p>{task.estimatedTime} godz.</p>

            <h3 className="font-semibold mt-4">Daty:</h3>
            <p>Dodano: {task.dateAdded.toLocaleString()}</p>
            {task.dateStarted && <p>Rozpoczęto: {task.dateStarted.toLocaleString()}</p>}
            {task.dateCompleted && <p>Zakończono: {task.dateCompleted.toLocaleString()}</p>}

            <h3 className="font-semibold mt-4">Przypisany użytkownik:</h3>
            {assignedUser ? (
              <p>{assignedUser.name} ({assignedUser.role})</p>
            ) : (
              <p>Nie przypisano</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {!assignedUser && (
            <button 
              onClick={handleAssignUser}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Przypisz użytkownika
            </button>
          )}

          {task.state === TaskState.DOING && assignedUser && (
            <button 
              onClick={handleCompleteTask}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Zakończ zadanie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}