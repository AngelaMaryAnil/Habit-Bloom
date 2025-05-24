import React from 'react';
import { Habit } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import { getLastNDays, getDayOfWeek } from '../utils/dateUtils';
import { getCompletionStatus, calculateWeeklyCompletion } from '../utils/habitUtils';
import CircularProgress from './ui/CircularProgress';

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habit: Habit, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleCompletion,
  onEdit,
  onDelete,
}) => {
  const last7Days = getLastNDays(7);
  const completionStatus = getCompletionStatus(habit, last7Days);
  const completionPercentage = calculateWeeklyCompletion(habit);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{habit.title}</h3>
          {habit.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{habit.description}</p>
          )}
          {habit.category && (
            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">
              {habit.category}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit habit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete habit"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CircularProgress percentage={completionPercentage} size={48} className="text-indigo-500 dark:text-indigo-400" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">Weekly</span>
            <span className="font-medium text-gray-900 dark:text-white">{completionPercentage}%</span>
          </div>
        </div>
        
        <div className="flex items-center bg-indigo-50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
          <span className="mr-1.5 text-xs uppercase font-semibold text-indigo-700 dark:text-indigo-300">Streak</span>
          <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{habit.streak}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 p-4">
        <div className="grid grid-cols-7 gap-1">
          {last7Days.map((date, index) => (
            <div key={date} className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {getDayOfWeek(date)}
              </span>
              <button
                onClick={() => onToggleCompletion(habit, date)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  completionStatus[index]
                    ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                aria-label={completionStatus[index] ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {completionStatus[index] && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;