import { Habit } from '../types';
import { getCurrentDate, getLastNDays } from './dateUtils';

const STORAGE_KEY = 'habits';

/**
 * Load habits from localStorage
 */
export const loadHabits = (): Habit[] => {
  const habitsJson = localStorage.getItem(STORAGE_KEY);
  if (!habitsJson) return [];
  
  try {
    return JSON.parse(habitsJson);
  } catch (error) {
    console.error('Failed to parse habits from localStorage', error);
    return [];
  }
};

/**
 * Save habits to localStorage
 */
export const saveHabits = (habits: Habit[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
};

/**
 * Create a new habit
 */
export const createHabit = (title: string, description?: string, category?: string): Habit => {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    completionData: {},
    streak: 0
  };
};

/**
 * Get the completion status for a habit for the last n days
 */
export const getCompletionStatus = (habit: Habit, days: string[]): boolean[] => {
  return days.map(day => !!habit.completionData[day]);
};

/**
 * Calculate the streak for a habit
 */
export const calculateStreak = (habit: Habit): number => {
  let streak = 0;
  const today = getCurrentDate();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  // If today is completed, start with streak of 1
  if (habit.completionData[today]) {
    streak = 1;
    
    // Count backwards from yesterday
    let currentDate = new Date(yesterdayStr);
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (habit.completionData[dateStr]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else if (habit.completionData[yesterdayStr]) {
    // If today isn't completed but yesterday was, count streak from yesterday
    streak = 1;
    
    // Count backwards from the day before yesterday
    let currentDate = new Date(yesterdayStr);
    currentDate.setDate(currentDate.getDate() - 1);
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (habit.completionData[dateStr]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
  }
  
  return streak;
};

/**
 * Calculate the weekly completion percentage
 */
export const calculateWeeklyCompletion = (habit: Habit): number => {
  const last7Days = getLastNDays(7);
  const completions = last7Days.filter(day => habit.completionData[day]).length;
  return Math.round((completions / 7) * 100);
};

/**
 * Toggle the completion status for a habit on a specific date
 */
export const toggleHabitCompletion = (habit: Habit, date: string): Habit => {
  const updatedHabit = { 
    ...habit,
    completionData: { 
      ...habit.completionData,
      [date]: !habit.completionData[date]
    }
  };
  
  // Recalculate streak
  updatedHabit.streak = calculateStreak(updatedHabit);
  
  return updatedHabit;
};

/**
 * Update streaks for all habits
 * This should be called when the app loads to handle streak resets
 */
export const updateAllStreaks = (habits: Habit[]): Habit[] => {
  return habits.map(habit => ({
    ...habit,
    streak: calculateStreak(habit)
  }));
};