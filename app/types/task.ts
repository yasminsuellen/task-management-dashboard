export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  searchTerm?: string;
  tags?: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}
