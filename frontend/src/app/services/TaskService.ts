import { Task, TaskState, UserRole } from '../types/Task';

class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    if (!task.id) {
      task.id = this.generateId();
      task.dateAdded = new Date();
    }

    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      // Update existing task
      this.tasks[index] = { ...task };
    } else {
      // Add new task
      this.tasks.push(task);
    }

    this.saveToLocalStorage();
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToLocalStorage();
  }

  assignUserToTask(taskId: string, user: { id: string, name: string, role: UserRole }): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && task.state === TaskState.TODO) {
      task.assignedUser = user;
      task.state = TaskState.DOING;
      task.dateStarted = new Date();
      this.saveToLocalStorage();
    }
  }

  completeTask(taskId: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && task.state === TaskState.DOING && task.assignedUser) {
      task.state = TaskState.DONE;
      task.dateCompleted = new Date();
      this.saveToLocalStorage();
    }
  }

  getTasksByState(state: TaskState): Task[] {
    return this.tasks.filter(task => task.state === state);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks).map((task: Task) => ({
          ...task,
          dateAdded: new Date(task.dateAdded),
          dateStarted: task.dateStarted ? new Date(task.dateStarted) : undefined,
          dateCompleted: task.dateCompleted ? new Date(task.dateCompleted) : undefined,
        }));
      }
    }
  }

  constructor() {
    this.loadFromLocalStorage();
  }
}

export const taskService = new TaskService();
