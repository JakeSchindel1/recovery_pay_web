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
    return [defaultTheme];
  }

  // Get all themes for an organization
  getOrganizationThemes(orgId: string): Theme[] {
    return this.storage.organizationThemes[orgId] || [];
  }

  // Get active theme for a user
  getUserActiveTheme(userId: string): string {
    return defaultTheme.name;
  }

  // Save a theme for a user
  saveTheme(userId: string, theme: Theme, orgId?: string): void {
    console.log('Saving theme:', theme.name);
  }

  // Delete a theme for a user
  deleteTheme(userId: string, themeId: string): void {
    console.log('Deleting theme:', themeId);
  }

  // Set active theme for a user
  setActiveTheme(userId: string, themeName: string): void {
    console.log('Setting active theme:', themeName);
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