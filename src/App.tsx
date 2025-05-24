import React, { useState, useEffect } from 'react';
import { Habit } from './types';
import { loadHabits, saveHabits, createHabit, toggleHabitCompletion, updateAllStreaks } from './utils/habitUtils';
import { useTheme } from './hooks/useTheme';

// Components
import Header from './components/Header';
import QuoteDisplay from './components/QuoteDisplay';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import EmptyState from './components/EmptyState';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);
  const [deleteHabitId, setDeleteHabitId] = useState<string | null>(null);
  const [isDarkMode, toggleTheme] = useTheme();
  
  // Load habits from localStorage on initial render
  useEffect(() => {
    const storedHabits = loadHabits();
    // Update all streaks (in case a day has passed)
    const habitsWithUpdatedStreaks = updateAllStreaks(storedHabits);
    setHabits(habitsWithUpdatedStreaks);
    
    // If streaks were updated, save the updated habits
    if (JSON.stringify(storedHabits) !== JSON.stringify(habitsWithUpdatedStreaks)) {
      saveHabits(habitsWithUpdatedStreaks);
    }
  }, []);
  
  // Open form to create a new habit
  const handleCreateHabit = () => {
    setEditingHabit(undefined);
    setIsFormOpen(true);
  };
  
  // Open form to edit an existing habit
  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };
  
  // Save a new or updated habit
  const handleSaveHabit = (title: string, description: string, category: string) => {
    let updatedHabits: Habit[];
    
    if (editingHabit) {
      // Update existing habit
      updatedHabits = habits.map(habit => 
        habit.id === editingHabit.id 
          ? { ...habit, title, description, category }
          : habit
      );
    } else {
      // Create new habit
      const newHabit = createHabit(title, description, category);
      updatedHabits = [...habits, newHabit];
    }
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setIsFormOpen(false);
    setEditingHabit(undefined);
  };
  
  // Toggle habit completion for a specific date
  const handleToggleCompletion = (habit: Habit, date: string) => {
    const updatedHabit = toggleHabitCompletion(habit, date);
    const updatedHabits = habits.map(h => h.id === habit.id ? updatedHabit : h);
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };
  
  // Confirm habit deletion
  const handleConfirmDelete = () => {
    if (deleteHabitId) {
      const updatedHabits = habits.filter(habit => habit.id !== deleteHabitId);
      setHabits(updatedHabits);
      saveHabits(updatedHabits);
      setDeleteHabitId(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        onCreateHabit={handleCreateHabit}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuoteDisplay />
        
        {habits.length === 0 ? (
          <EmptyState onCreateHabit={handleCreateHabit} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleCompletion={handleToggleCompletion}
                onEdit={handleEditHabit}
                onDelete={(id) => setDeleteHabitId(id)}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Habit Form Modal */}
      {isFormOpen && (
        <HabitForm
          habit={editingHabit}
          onSave={handleSaveHabit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingHabit(undefined);
          }}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      {deleteHabitId && (
        <ConfirmDialog
          title="Delete Habit"
          message="Are you sure you want to delete this habit? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteHabitId(null)}
          isDestructive={true}
        />
      )}
    </div>
  );
}

export default App;