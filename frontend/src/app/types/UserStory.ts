export type Priority = 'low' | 'medium' | 'high';
export type State = 'todo' | 'doing' | 'done';

export interface UserStory {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  project: string;
  dateCreated: string;
  state: State;
  ownerId: string;
}

export interface CreateUserStoryDTO {
  name: string;
  description: string;
  priority: Priority;
  project: string;
  state: State;
  ownerId?: string; // Optional as it will be set by the API
}

export interface UpdateUserStoryDTO {
  name?: string;
  description?: string;
  priority?: Priority;
  project?: string;
  state?: State;
}

export interface Project {
  id: string;
  nazwa: string;
  opis: string;
  ownerId: string;
}

export interface ProjectDTO {
  nazwa: string;
  opis: string;
}
