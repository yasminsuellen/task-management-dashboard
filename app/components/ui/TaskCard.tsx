import React from 'react';
import { Task } from '@/app/types/task';
import { formatDate } from '@/app/lib/taskUtils';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onStatusChange, onDelete, onEdit }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border-l-4"
         style={{ borderColor: task.status === 'completed' ? '#10b981' : task.priority === 'high' ? '#ef4444' : '#3b82f6' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ').charAt(0).toUpperCase() + task.status.replace('-', ' ').slice(1)}
        </span>
        {task.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue && <span className="ml-1">(Overdue)</span>}
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
