import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (): [boolean, () => void] => {
  // Check if user has a theme preference in localStorage
  const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Check if user has a system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme());
  
  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return [isDarkMode, toggleTheme];
};