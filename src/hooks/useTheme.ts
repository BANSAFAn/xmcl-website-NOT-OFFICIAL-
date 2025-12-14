
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Apply theme-specific styles
    // The actual styles are handled by CSS variables in index.css based on the class
    // This previously had manual style injection which caused INP issues
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
