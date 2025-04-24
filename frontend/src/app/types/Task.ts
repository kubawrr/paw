import { UserStory } from './UserStory';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TaskState {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done'
}

export enum UserRole {
  DEVELOPER = 'developer',
  DEVOPS = 'devops'
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  priority: TaskPriority;
  userStoryId: string;
  estimatedTime: number; // in hours
  state: TaskState;
  dateAdded: Date;
  dateStarted?: Date;
  dateCompleted?: Date;
  assignedUser?: {
    id: string;
    name: string;
    role: UserRole;
  };
}