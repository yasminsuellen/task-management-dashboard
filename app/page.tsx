'use client';

import { useState, useEffect, useMemo } from 'react';
import { Task, TaskFilters } from '@/app/types/task';
import { filterTasks, calculateTaskStats, sortTasks } from '@/app/lib/taskUtils';
import { mockTasks } from '@/app/lib/mockData';
import StatCard from '@/app/components/ui/StatCard';
import TaskCard from '@/app/components/ui/TaskCard';
import TaskModal from '@/app/components/ui/TaskModal';
import FilterBar from '@/app/components/ui/FilterBar';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');

  // Initialize tasks from localStorage or mock data
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(mockTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortBy);
  }, [tasks, filters, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => calculateTaskStats(tasks), [tasks]);

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tasks.forEach((task) => {
      task.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [tasks]);

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Management Dashboard</h1>
              <p className="text-gray-600 mt-1">Organize and track your projects efficiently</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={stats.total}
            color="text-blue-600"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            }
            subtitle={`${Math.round((stats.completed / stats.total) * 100 || 0)}% completed`}
          />
          <StatCard
            title="To Do"
            value={stats.todo}
            color="text-gray-600"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            }
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            color="text-yellow-600"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            }
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            color="text-green-600"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          availableTags={availableTags}
        />

        {/* Sort Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('dueDate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  sortBy === 'dueDate'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Due Date
              </button>
              <button
                onClick={() => setSortBy('priority')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  sortBy === 'priority'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Priority
              </button>
              <button
                onClick={() => setSortBy('createdAt')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  sortBy === 'createdAt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Created Date
              </button>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-4">
              {tasks.length === 0
                ? 'Get started by creating your first task!'
                : 'Try adjusting your filters or create a new task.'}
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
