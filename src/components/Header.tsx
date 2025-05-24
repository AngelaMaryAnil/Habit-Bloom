import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

interface HeaderProps {
  onCreateHabit: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateHabit, isDarkMode, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Calendar size={24} className="text-indigo-600 dark:text-indigo-400 mr-2" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Habit Tracker
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateHabit}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              New Habit
            </button>
            
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;