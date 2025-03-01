import { createClient } from '@supabase/supabase-js';
import { Theme, ThemeVariant, defaultTheme, convertToReactNativeTheme } from './themes';
import { supabase } from './supabase';

// Interface for theme database model
interface ThemeRecord {
  id: string;
  name: string;
  light_variant: ThemeVariant;
  dark_variant: ThemeVariant;
  created_by: string;
  organization_id?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Interface for user theme preferences
interface UserThemePreference {
  user_id: string;
  theme_id: string;
  is_dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

// Convert database theme record to application theme model
function mapThemeRecordToTheme(record: ThemeRecord): Theme {
  return {
    id: record.id,
    name: record.name,
    light: record.light_variant,
    dark: record.dark_variant,
    createdBy: record.created_by,
    organizationId: record.organization_id,
    isDefault: record.is_default,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

// Convert application theme model to database theme record
function mapThemeToThemeRecord(theme: Theme): Partial<ThemeRecord> {
  return {
    id: theme.id,
    name: theme.name,
    light_variant: theme.light,
    dark_variant: theme.dark,
    created_by: theme.createdBy,
    organization_id: theme.organizationId,
    is_default: theme.isDefault || false
  };
}

export class SupabaseThemeService {
  private static instance: SupabaseThemeService;

  private constructor() {}

  public static getInstance(): SupabaseThemeService {
    if (!SupabaseThemeService.instance) {
      SupabaseThemeService.instance = new SupabaseThemeService();
    }
    return SupabaseThemeService.instance;
  }

  // Get all themes available to the user (their own and organization themes)
  async getUserThemes(): Promise<Theme[]> {
    const { data, error } = await supabase
      .from('themes')
      .select('*');

    if (error) {
      console.error('Error fetching themes:', error);
      return [defaultTheme];
    }

    return data.map((theme: any) => ({
      id: theme.id,
      name: theme.name,
      light: theme.light_variant,
      dark: theme.dark_variant,
      createdBy: theme.created_by,
      organizationId: theme.organization_id,
      isDefault: theme.is_default,
      createdAt: theme.created_at,
      updatedAt: theme.updated_at
    }));
  }

  // Get the user's active theme preference
  async getUserActiveTheme(): Promise<{ themeId: string | null, isDarkMode: boolean }> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return { themeId: null, isDarkMode: false };
    }

    const { data, error } = await supabase
      .from('user_theme_preferences')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (error || !data) {
      return { themeId: null, isDarkMode: false };
    }

    return {
      themeId: data.theme_id,
      isDarkMode: data.is_dark_mode
    };
  }

  // Save a theme to the database
  async saveTheme(theme: Theme): Promise<Theme> {
    // Check if this is an update or a new theme
    const isUpdate = !!theme.id;
    
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Check if user is an owner (can be implemented based on your user roles system)
    const { data: userOrgs } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.user.id)
      .single();

    if (!userOrgs || userOrgs.role !== 'owner') {
      throw new Error('Only organization owners can create or update themes');
    }

    // Get user's organization
    const { data: userOrg } = await supabase
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', user.user.id)
      .single();

    if (!userOrg) {
      throw new Error('User not associated with an organization');
    }

    const themeData = {
      name: theme.name,
      light_variant: theme.light,
      dark_variant: theme.dark,
      created_by: user.user.id,
      organization_id: userOrg.organization_id,
      is_default: theme.isDefault || false,
      updated_at: new Date().toISOString()
    };

    let result;
    
    if (isUpdate) {
      // Update existing theme
      const { data, error } = await supabase
        .from('themes')
        .update(themeData)
        .eq('id', theme.id)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating theme:', error);
        throw error;
      }
      
      result = data;
    } else {
      // Insert new theme
      const { data, error } = await supabase
        .from('themes')
        .insert({
          ...themeData,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating theme:', error);
        throw error;
      }
      
      result = data;
    }

    return {
      id: result.id,
      name: result.name,
      light: result.light_variant,
      dark: result.dark_variant,
      createdBy: result.created_by,
      organizationId: result.organization_id,
      isDefault: result.is_default,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };
  }

  // Delete a theme
  async deleteTheme(themeId: string): Promise<void> {
    const { error } = await supabase
      .from('themes')
      .delete()
      .eq('id', themeId);

    if (error) {
      console.error('Error deleting theme:', error);
      throw error;
    }
  }

  // Set the active theme for a user
  async setActiveTheme(themeId: string, isDarkMode: boolean): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('user_theme_preferences')
      .upsert({
        user_id: user.user.id,
        theme_id: themeId,
        is_dark_mode: isDarkMode,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('Error setting active theme:', error);
      throw error;
    }
  }

  // Apply a theme to all users in an organization
  async applyThemeToOrganization(themeId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Check if user is an owner
    const { data: userOrgs } = await supabase
      .from('user_organizations')
      .select('role, organization_id')
      .eq('user_id', user.user.id)
      .single();

    if (!userOrgs || userOrgs.role !== 'owner') {
      throw new Error('Only organization owners can apply themes to the organization');
    }

    // Get all users in the organization
    const { data: orgUsers, error: usersError } = await supabase
      .from('user_organizations')
      .select('user_id')
      .eq('organization_id', userOrgs.organization_id);

    if (usersError) {
      console.error('Error fetching organization users:', usersError);
      throw usersError;
    }

    // Update theme preference for all users
    const updates = orgUsers.map(async (orgUser) => {
      const { error } = await supabase
        .from('user_theme_preferences')
        .upsert({
          user_id: orgUser.user_id,
          theme_id: themeId,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error(`Error updating theme for user ${orgUser.user_id}:`, error);
      }
    });

    await Promise.all(updates);
  }

  // Export a theme to JSON format
  exportTheme(theme: Theme): string {
    return JSON.stringify(theme);
  }

  // Import a theme from JSON format
  importTheme(themeJson: string): Theme {
    try {
      return JSON.parse(themeJson);
    } catch (error) {
      console.error('Error parsing theme JSON:', error);
      return defaultTheme;
    }
  }

  // Convert a theme to React Native format
  convertToReactNativeFormat(theme: Theme, isDarkMode: boolean = false): any {
    return convertToReactNativeTheme(theme, isDarkMode);
  }
}

// Export a singleton instance
export const supabaseThemeService = SupabaseThemeService.getInstance(); 