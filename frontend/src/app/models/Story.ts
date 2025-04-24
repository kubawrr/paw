// app/models/Story.ts
export interface Story {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    project: string;
    createdAt: string;
    status: 'todo' | 'doing' | 'done';
    ownerId: string;
  }
      