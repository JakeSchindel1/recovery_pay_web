// Theme definitions for the application
// This file contains all color and style variables used throughout the app

export type ThemeColors = {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Background colors
  background: string;
  backgroundSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Status colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Button colors
  buttonBackground: string;
  buttonText: string;
  buttonSecondaryBackground: string;
  buttonSecondaryText: string;
};

export type ThemeVariant = {
  colors: ThemeColors;
};

export type Theme = {
  id?: string;
  name: string;
  light: ThemeVariant;
  dark: ThemeVariant;
  createdBy?: string;
  organizationId?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Light theme colors
const lightColors: ThemeColors = {
  // Primary colors
  primary: '#3498db', // Blue
  secondary: '#2ecc71', // Green
  accent: '#9b59b6', // Purple

  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  
  // Text colors
  text: '#333333',
  textSecondary: '#6c757d',
  textMuted: '#adb5bd',
  
  // Status colors
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // Border colors
  border: '#dee2e6',
  borderLight: '#e9ecef',
  
  // Button colors
  buttonBackground: '#3498db',
  buttonText: '#ffffff',
  buttonSecondaryBackground: '#f8f9fa',
  buttonSecondaryText: '#3498db',
};

// Dark theme colors
const darkColors: ThemeColors = {
  // Primary colors
  primary: '#3498db', // Blue
  secondary: '#2ecc71', // Green
  accent: '#9b59b6', // Purple

  // Background colors
  background: '#121212',
  backgroundSecondary: '#1e1e1e',
  
  // Text colors
  text: '#f8f9fa',
  textSecondary: '#adb5bd',
  textMuted: '#6c757d',
  
  // Status colors
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // Border colors
  border: '#343a40',
  borderLight: '#495057',
  
  // Button colors
  buttonBackground: '#3498db',
  buttonText: '#ffffff',
  buttonSecondaryBackground: '#343a40',
  buttonSecondaryText: '#3498db',
};

// Default theme with both light and dark variants
export const defaultTheme: Theme = {
  name: 'Default',
  light: { colors: lightColors },
  dark: { colors: darkColors },
  isDefault: true
};

// Legacy theme objects for backward compatibility
export const lightTheme = {
  name: 'light',
  colors: lightColors
};

export const darkTheme = {
  name: 'dark',
  colors: darkColors
};

// Get a theme variant by mode
export function getThemeVariant(theme: Theme, mode: 'light' | 'dark'): ThemeVariant {
  return mode === 'dark' ? theme.dark : theme.light;
}

// Get a legacy theme by name (for backward compatibility)
export function getTheme(name: string): Theme {
  switch (name) {
    case 'dark':
      return darkTheme as unknown as Theme;
    case 'light':
    default:
      return lightTheme as unknown as Theme;
  }
}

// Helper function to get CSS variables from a theme variant
export function getThemeVariables(themeVariant: ThemeVariant): Record<string, string> {
  const variables: Record<string, string> = {};
  
  Object.entries(themeVariant.colors).forEach(([key, value]) => {
    variables[`--${key}`] = value;
  });
  
  return variables;
}

// Convert theme to React Native format
export function convertToReactNativeTheme(theme: Theme, isDarkMode: boolean = false): {
  colors: ThemeColors;
  typography: {
    fontFamily: {
      regular: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
    fontWeight: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    round: number;
  };
} {
  const variant = isDarkMode ? theme.dark : theme.light;
  
  return {
    colors: {
      ...variant.colors
    },
    typography: {
      fontFamily: {
        regular: 'System',
        bold: 'System',
      },
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      round: 9999,
    }
  };
} 