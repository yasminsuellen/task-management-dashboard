import React from 'react';
import { TaskStatus, TaskPriority, TaskFilters } from '@/app/types/task';

interface FilterBarProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
  availableTags: string[];
}

export default function FilterBar({ filters, onFilterChange, availableTags }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchTerm || ''}
            onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TaskStatus || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority || ''}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TaskPriority || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <select
            id="tags"
            multiple
            value={filters.tags || []}
            onChange={(e) => {
              const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
              onFilterChange({ ...filters, tags: selectedTags.length > 0 ? selectedTags : undefined });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            size={3}
          >
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
        </div>
      </div>

      {(filters.searchTerm || filters.status || filters.priority || (filters.tags && filters.tags.length > 0)) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.searchTerm && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              Search: {filters.searchTerm}
            </span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              Status: {filters.status}
            </span>
          )}
          {filters.priority && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              Priority: {filters.priority}
            </span>
          )}
          {filters.tags?.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
              #{tag}
            </span>
          ))}
          <button
            onClick={() => onFilterChange({})}
            className="ml-auto text-sm text-red-600 hover:text-red-800"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
