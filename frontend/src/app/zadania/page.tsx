'use client';

import { useState, useEffect } from 'react';
import { Task, TaskState } from '../types/Task';
import { taskService } from '../services/TaskService';
import TaskForm from '../components/TaskForm';
import TaskDetail from '../components/TaskDetail';

export default function TaskKanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const allTasks = taskService.getAllTasks();
    setTasks(allTasks);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
      taskService.deleteTask(id);
      loadTasks();
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const handleFormSubmit = () => {
    loadTasks();
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const todoTasks = tasks.filter(task => task.state === TaskState.TODO);
  const doingTasks = tasks.filter(task => task.state === TaskState.DOING);
  const doneTasks = tasks.filter(task => task.state === TaskState.DONE);

  const renderTaskColumn = (tasks: Task[], title: string) => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50"
          onClick={() => task.id && setSelectedTaskId(task.id)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{task.name}</h3>
            <div className="flex space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTask(task);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Edytuj
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id!);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Usuń
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-2 flex justify-between">
            <span className={`
              px-2 py-1 rounded text-xs
              ${task.priority === 'high' ? 'bg-red-200 text-red-800' : 
                task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : 
                'bg-green-200 text-green-800'}
            `}>
              {task.priority}
            </span>
            {task.assignedUser && (
              <span className="text-sm text-gray-600">
                {task.assignedUser.name}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Zadania</h1>
      
      <button 
        onClick={handleCreateTask}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Dodaj nowe zadanie
      </button>
      
      {isFormVisible && (
        <TaskForm 
          task={editingTask} 
          onSubmit={handleFormSubmit} 
          onCancel={handleFormClose} 
        />
      )}

      {selectedTaskId && (
        <TaskDetail 
          taskId={selectedTaskId} 
          onClose={() => setSelectedTaskId(null)} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderTaskColumn(todoTasks, 'Do zrobienia')}
        {renderTaskColumn(doingTasks, 'W trakcie')}
        {renderTaskColumn(doneTasks, 'Zakończone')}
      </div>
    </div>
  );
}