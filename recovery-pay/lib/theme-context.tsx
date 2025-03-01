'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeVariant, defaultTheme, getThemeVariant, getThemeVariables } from './themes';
import themeService from './theme-service';
import supabaseThemeService from './supabase-theme-service';
import { useAuth } from './auth-context';

type ThemeContextType = {
  currentTheme: Theme;
  currentVariant: ThemeVariant;
  setTheme: (themeId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  availableThemes: Theme[];
  refreshThemes: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentVariant, setCurrentVariant] = useState<ThemeVariant>(defaultTheme.light);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([defaultTheme]);
  const { user } = useAuth();

  // Initialize theme and mode from storage
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // First try to load from Supabase if user is authenticated
        if (user) {
          // Load user preference
          const preference = await supabaseThemeService.getUserThemePreference();
          if (preference) {
            // Set dark mode from preference
            setIsDarkMode(preference.isDarkMode);
            
            // Get the theme by ID
            const theme = await supabaseThemeService.getThemeById(preference.themeId);
            if (theme) {
              setCurrentTheme(theme);
              setCurrentVariant(preference.isDarkMode ? theme.dark : theme.light);
              return;
            }
          }
          
          // If no preference found, load available themes and use default
          const themes = await supabaseThemeService.getUserThemes();
          setAvailableThemes(themes);
          
          // Use default theme
          const defaultThemeFromList = themes.find(t => t.isDefault) || themes[0] || defaultTheme;
          setCurrentTheme(defaultThemeFromList);
          
          // Check localStorage for dark mode preference
          const savedDarkMode = localStorage.getItem('darkMode') === 'true';
          setIsDarkMode(savedDarkMode);
          setCurrentVariant(savedDarkMode ? defaultThemeFromList.dark : defaultThemeFromList.light);
          return;
        }
        
        // Fallback to localStorage for non-authenticated users
        const savedThemeName = localStorage.getItem('themeName') || defaultTheme.name;
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Set initial dark mode state
        setIsDarkMode(savedDarkMode);
        
        // Find the theme by name from local storage
        const userThemes = themeService.getUserThemes('default_user');
        const theme = userThemes.find(t => t.name === savedThemeName) || defaultTheme;
        
        // Set the current theme
        setCurrentTheme(theme);
        setAvailableThemes(userThemes);
        
        // Set the current variant based on dark mode
        setCurrentVariant(savedDarkMode ? theme.dark : theme.light);
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback to default theme
        setCurrentTheme(defaultTheme);
        setCurrentVariant(defaultTheme.light);
        setAvailableThemes([defaultTheme]);
      }
    };
    
    initializeTheme();
  }, [user]);

  // Refresh available themes
  const refreshThemes = async () => {
    try {
      if (user) {
        // Load from Supabase
        const themes = await supabaseThemeService.getUserThemes();
        setAvailableThemes(themes);
      } else {
        // Load from local storage
        const userThemes = themeService.getUserThemes('default_user');
        setAvailableThemes(userThemes);
      }
    } catch (error) {
      console.error('Error refreshing themes:', error);
    }
  };

  // Apply theme variables to document root
  useEffect(() => {
    if (!currentVariant) return;
    
    const variables = getThemeVariables(currentVariant);
    const root = document.documentElement;
    
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Update body class for additional theme-based styling
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [currentVariant, isDarkMode]);

  // Set theme function
  const setTheme = async (themeId: string) => {
    try {
      const theme = availableThemes.find(t => t.id === themeId) || defaultTheme;
      setCurrentTheme(theme);
      setCurrentVariant(isDarkMode ? theme.dark : theme.light);
      
      // Save preference
      if (user) {
        // Save to Supabase
        await supabaseThemeService.setUserThemePreference(themeId, isDarkMode);
      } else {
        // Save to localStorage
        localStorage.setItem('themeName', theme.name);
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  // Toggle between light and dark mode
  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      setCurrentVariant(newDarkMode ? currentTheme.dark : currentTheme.light);
      
      // Save preference
      localStorage.setItem('darkMode', newDarkMode.toString());
      
      if (user && currentTheme.id) {
        // Save to Supabase
        await supabaseThemeService.setUserThemePreference(currentTheme.id, newDarkMode);
      }
    } catch (error) {
      console.error('Error toggling dark mode:', error);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        currentVariant,
        setTheme, 
        isDarkMode, 
        toggleDarkMode,
        availableThemes,
        refreshThemes
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 