import { Task, TaskFilters, TaskStats } from '@/app/types/task';

/**
 * Filter tasks based on provided criteria
 */
export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    // Filter by status
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((filterTag) =>
        task.tags.includes(filterTag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Calculate task statistics
 */
export function calculateTaskStats(tasks: Task[]): TaskStats {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
  };
}

/**
 * Sort tasks by various criteria
 */
export function sortTasks(
  tasks: Task[],
  sortBy: 'dueDate' | 'priority' | 'createdAt' = 'dueDate'
): Task[] {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'dueDate':
      return sorted.sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    
    case 'createdAt':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    
    default:
      return sorted;
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
