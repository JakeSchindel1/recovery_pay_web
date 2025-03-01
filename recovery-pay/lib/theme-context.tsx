'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeVariant, defaultTheme, getThemeVariant, getThemeVariables } from './themes';
import themeService from './theme-service';
import { supabaseThemeService } from './supabase-theme-service';
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
    // Load dark mode from localStorage first
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);

    // Load theme based on authentication status
    const loadTheme = async () => {
      try {
        if (!user) {
          // Non-authenticated users use local storage
          const savedThemeName = localStorage.getItem('themeName') || defaultTheme.name;
          const userThemes = themeService.getUserThemes('default_user');
          const theme = userThemes.find(t => t.name === savedThemeName) || defaultTheme;
          setCurrentTheme(theme);
          setAvailableThemes(userThemes);
          setCurrentVariant(savedDarkMode ? theme.dark : theme.light);
          return;
        }

        // For authenticated users, try to load from Supabase
        const themes = await supabaseThemeService.getUserThemes();
        setAvailableThemes(themes);

        const preference = await supabaseThemeService.getUserActiveTheme();
        if (preference?.themeId) {
          const theme = themes.find((t: Theme) => t.id === preference.themeId);
          if (theme) {
            setCurrentTheme(theme);
            setIsDarkMode(preference.isDarkMode);
            setCurrentVariant(preference.isDarkMode ? theme.dark : theme.light);
            return;
          }
        }

        // If no preference or theme not found, use default
        const defaultThemeFromList = themes.find((t: Theme) => t.isDefault) || themes[0] || defaultTheme;
        setCurrentTheme(defaultThemeFromList);
        setCurrentVariant(savedDarkMode ? defaultThemeFromList.dark : defaultThemeFromList.light);
      } catch (error) {
        console.error('Error loading theme:', error);
        // Fallback to default theme
        setCurrentTheme(defaultTheme);
        setCurrentVariant(savedDarkMode ? defaultTheme.dark : defaultTheme.light);
      }
    };

    loadTheme();
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
        await supabaseThemeService.setActiveTheme(themeId, isDarkMode);
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
        await supabaseThemeService.setActiveTheme(currentTheme.id, newDarkMode);
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