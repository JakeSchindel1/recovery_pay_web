import { Theme, ThemeVariant, defaultTheme, lightTheme, darkTheme, getThemeVariant } from './themes';

// Interface for theme storage
interface ThemeStorage {
  userThemes: Record<string, Theme[]>;
  activeThemes: Record<string, string>;
  organizationThemes: Record<string, Theme[]>;
}

// Mock API for theme management
// In a real application, this would interact with a database
class ThemeService {
  private storage: ThemeStorage;

  constructor() {
    // Initialize storage
    this.storage = {
      userThemes: {},
      activeThemes: {},
      organizationThemes: {}
    };

    // Load from localStorage in client-side environments
    if (typeof window !== 'undefined') {
      const savedStorage = localStorage.getItem('themeStorage');
      if (savedStorage) {
        try {
          this.storage = JSON.parse(savedStorage);
          
          // Migrate old themes to new format if needed
          this.migrateThemes();
        } catch (error) {
          console.error('Failed to parse theme storage:', error);
        }
      }
    }
  }

  // Migrate old themes to new format
  private migrateThemes(): void {
    // Iterate through all user themes
    Object.keys(this.storage.userThemes).forEach(userId => {
      const userThemes = this.storage.userThemes[userId];
      
      // Convert old themes to new format
      this.storage.userThemes[userId] = userThemes.map((theme: any) => {
        // If theme already has light and dark properties, it's already migrated
        if ('light' in theme && 'dark' in theme) {
          return theme;
        }
        
        // Otherwise, convert it to the new format
        const themeName = theme.name || 'Migrated Theme';
        return {
          name: themeName,
          light: { colors: theme.colors || {} },
          dark: { colors: theme.colors || {} }, // Use same colors for dark as placeholder
          createdBy: userId,
          isDefault: themeName === 'light' || themeName === 'dark'
        };
      });
    });
    
    this.saveStorage();
  }

  // Save storage to localStorage
  private saveStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeStorage', JSON.stringify(this.storage));
    }
  }

  // Get all themes for a user
  getUserThemes(userId: string): Theme[] {
    if (!this.storage.userThemes[userId]) {
      // Initialize with default theme
      this.storage.userThemes[userId] = [defaultTheme];
      this.saveStorage();
    }
    return this.storage.userThemes[userId];
  }

  // Get all themes for an organization
  getOrganizationThemes(orgId: string): Theme[] {
    return this.storage.organizationThemes[orgId] || [];
  }

  // Get active theme for a user
  getUserActiveTheme(userId: string): string {
    return this.storage.activeThemes[userId] || defaultTheme.name;
  }

  // Save a theme for a user
  saveTheme(userId: string, theme: Theme, orgId?: string): void {
    // Ensure user themes array exists
    if (!this.storage.userThemes[userId]) {
      this.storage.userThemes[userId] = [defaultTheme];
    }

    // Add organization ID if provided
    if (orgId) {
      theme.organizationId = orgId;
    }

    // Add creator info
    theme.createdBy = userId;
    theme.createdAt = new Date().toISOString();
    theme.updatedAt = new Date().toISOString();

    // Generate a unique ID if not provided
    if (!theme.id) {
      theme.id = `theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Check if theme with same ID exists
    const existingIndex = this.storage.userThemes[userId].findIndex(
      t => t.id === theme.id
    );

    if (existingIndex >= 0) {
      // Update existing theme
      theme.updatedAt = new Date().toISOString();
      this.storage.userThemes[userId][existingIndex] = theme;
    } else {
      // Add new theme
      this.storage.userThemes[userId].push(theme);
    }

    // If this is an organization theme, also save to organization themes
    if (orgId) {
      if (!this.storage.organizationThemes[orgId]) {
        this.storage.organizationThemes[orgId] = [];
      }
      
      const orgThemeIndex = this.storage.organizationThemes[orgId].findIndex(
        t => t.id === theme.id
      );
      
      if (orgThemeIndex >= 0) {
        this.storage.organizationThemes[orgId][orgThemeIndex] = theme;
      } else {
        this.storage.organizationThemes[orgId].push(theme);
      }
    }

    this.saveStorage();
  }

  // Delete a theme for a user
  deleteTheme(userId: string, themeId: string): void {
    if (!this.storage.userThemes[userId]) return;

    const themeToDelete = this.storage.userThemes[userId].find(t => t.id === themeId);
    
    // Don't allow deleting default themes
    if (themeToDelete?.isDefault) return;

    this.storage.userThemes[userId] = this.storage.userThemes[userId].filter(
      t => t.id !== themeId
    );

    // If active theme was deleted, reset to default
    if (this.storage.activeThemes[userId] === themeToDelete?.name) {
      this.storage.activeThemes[userId] = defaultTheme.name;
    }

    // If it was an organization theme, remove from organization themes too
    if (themeToDelete?.organizationId) {
      const orgId = themeToDelete.organizationId;
      if (this.storage.organizationThemes[orgId]) {
        this.storage.organizationThemes[orgId] = this.storage.organizationThemes[orgId].filter(
          t => t.id !== themeId
        );
      }
    }

    this.saveStorage();
  }

  // Set active theme for a user
  setActiveTheme(userId: string, themeName: string): void {
    this.storage.activeThemes[userId] = themeName;
    this.saveStorage();
  }

  // Share a theme with another user
  shareTheme(fromUserId: string, toUserId: string, themeId: string): boolean {
    if (!this.storage.userThemes[fromUserId]) return false;

    const theme = this.storage.userThemes[fromUserId].find(
      t => t.id === themeId
    );

    if (!theme) return false;

    // Create a copy of the theme with a unique ID
    const sharedTheme: Theme = {
      ...theme,
      id: `theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${theme.name} (Shared)`,
      createdBy: toUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDefault: false
    };

    this.saveTheme(toUserId, sharedTheme);
    return true;
  }

  // Apply a theme to all users in an organization
  applyThemeToOrganization(userId: string, themeId: string, orgId: string): boolean {
    if (!this.storage.userThemes[userId]) return false;

    const theme = this.storage.userThemes[userId].find(
      t => t.id === themeId
    );

    if (!theme) return false;

    // Make a copy for the organization
    const orgTheme: Theme = {
      ...theme,
      id: `org_theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      organizationId: orgId,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to organization themes
    if (!this.storage.organizationThemes[orgId]) {
      this.storage.organizationThemes[orgId] = [];
    }
    
    this.storage.organizationThemes[orgId].push(orgTheme);
    this.saveStorage();
    
    // In a real app, this would get all users in the organization
    // and apply the theme to each one
    console.log(`Applied theme ${theme.name} to organization ${orgId}`);
    return true;
  }

  // Export a theme as JSON
  exportTheme(userId: string, themeId: string): string | null {
    if (!this.storage.userThemes[userId]) return null;

    const theme = this.storage.userThemes[userId].find(
      t => t.id === themeId
    );

    if (!theme) return null;

    return JSON.stringify(theme, null, 2);
  }

  // Import a theme from JSON
  importTheme(userId: string, themeJson: string, orgId?: string): boolean {
    try {
      const theme = JSON.parse(themeJson) as Theme;
      
      if (!theme.name || !theme.light || !theme.dark) {
        return false;
      }

      // Generate a new ID to avoid conflicts
      theme.id = `theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      this.saveTheme(userId, theme, orgId);
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }

  // Get a theme by ID
  getThemeById(userId: string, themeId: string): Theme | null {
    if (!this.storage.userThemes[userId]) return null;

    const theme = this.storage.userThemes[userId].find(
      t => t.id === themeId
    );

    return theme || null;
  }

  // Get a theme by name
  getThemeByName(userId: string, themeName: string): Theme | null {
    if (!this.storage.userThemes[userId]) return null;

    const theme = this.storage.userThemes[userId].find(
      t => t.name === themeName
    );

    return theme || null;
  }
}

// Create a singleton instance
export const themeService = new ThemeService();

export default themeService; 