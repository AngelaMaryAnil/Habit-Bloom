import React from 'react';
import { Calendar } from 'lucide-react';

interface EmptyStateProps {
  onCreateHabit: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateHabit }) => {
  return (
    <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex justify-center">
        <Calendar size={48} className="text-indigo-400 dark:text-indigo-500 mb-4" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No habits yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Start tracking your daily habits to build consistency and achieve your goals.
      </p>
      <button
        onClick={onCreateHabit}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Create your first habit
      </button>
    </div>
  );
};

export default EmptyState;