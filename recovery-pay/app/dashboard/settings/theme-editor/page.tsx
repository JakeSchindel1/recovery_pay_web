'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Theme, ThemeColors, defaultTheme } from '@/lib/themes';
import { supabaseThemeService } from '@/lib/supabase-theme-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/ui/color-picker';
import { toast } from 'sonner';
import { PlusIcon, TrashIcon, DownloadIcon, UploadIcon, SaveIcon, CheckIcon } from 'lucide-react';
import { isPremiumUser } from '@/lib/premium-utils';
import { PremiumFeatureMessage } from '@/components/premium-feature-message';

export default function ThemeEditor() {
  const { user, loading } = useAuth();
  const { theme: currentTheme, setTheme } = useTheme();
  const router = useRouter();
  
  // State for theme management
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme);
  const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
  const [themeName, setThemeName] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Color categories for organization
  const colorCategories = [
    {
      name: 'Primary Colors',
      colors: ['primary', 'secondary', 'accent']
    },
    {
      name: 'Background Colors',
      colors: ['background', 'backgroundSecondary']
    },
    {
      name: 'Text Colors',
      colors: ['text', 'textSecondary', 'textMuted']
    },
    {
      name: 'Status Colors',
      colors: ['success', 'error', 'warning', 'info']
    },
    {
      name: 'Border Colors',
      colors: ['border', 'borderLight']
    },
    {
      name: 'Button Colors',
      colors: ['buttonBackground', 'buttonText', 'buttonSecondaryBackground', 'buttonSecondaryText']
    }
  ];

  // Load user themes
  useEffect(() => {
    async function loadThemes() {
      if (loading || !user) return;
      
      try {
        setIsLoading(true);
        
        // Check if user is premium
        const premium = await isPremiumUser(user.id);
        setIsPremium(premium);
        
        if (!premium) {
          setIsLoading(false);
          return;
        }
        
        // Load themes
        const userThemes = await supabaseThemeService.getUserThemes();
        setThemes(userThemes);
        
        // Get active theme
        const activeThemePreference = await supabaseThemeService.getUserActiveTheme();
        
        if (activeThemePreference.themeId) {
          const activeTheme = userThemes.find(t => t.id === activeThemePreference.themeId);
          if (activeTheme) {
            setActiveTheme(activeTheme);
            setThemeName(activeTheme.name);
          }
        } else {
          // Use default theme if no active theme is set
          setActiveTheme(defaultTheme);
          setThemeName(defaultTheme.name);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading themes:', error);
        toast.error('Failed to load themes');
        setIsLoading(false);
      }
    }
    
    loadThemes();
  }, [user, loading]);

  // Handle color change
  const handleColorChange = useCallback((colorKey: string, value: string) => {
    setActiveTheme(prev => {
      const variant = activeTab === 'light' ? { ...prev.light } : { ...prev.dark };
      variant.colors = { ...variant.colors, [colorKey]: value };
      
      return {
        ...prev,
        [activeTab]: variant
      };
    });
  }, [activeTab]);

  // Save theme
  const saveTheme = async () => {
    if (!isPremium) {
      toast.error('Premium subscription required to save themes');
      return;
    }
    
    if (!themeName.trim()) {
      toast.error('Please enter a theme name');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const themeToSave: Theme = {
        ...activeTheme,
        name: themeName
      };
      
      const savedTheme = await supabaseThemeService.saveTheme(themeToSave);
      
      // Update themes list
      setThemes(prev => {
        const existing = prev.findIndex(t => t.id === savedTheme.id);
        if (existing >= 0) {
          return prev.map(t => t.id === savedTheme.id ? savedTheme : t);
        } else {
          return [...prev, savedTheme];
        }
      });
      
      // Update active theme
      setActiveTheme(savedTheme);
      
      toast.success('Theme saved successfully');
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  // Apply theme
  const applyTheme = async () => {
    if (!activeTheme.id && activeTheme !== defaultTheme) {
      toast.error('Please save the theme first');
      return;
    }
    
    try {
      // Set as active theme
      const themeId = activeTheme.id || 'default';
      await supabaseThemeService.setActiveTheme(themeId, activeTab === 'dark');
      
      // Apply to current session
      setTheme(activeTab === 'dark' ? 'dark' : 'light', activeTheme);
      
      toast.success('Theme applied successfully');
    } catch (error) {
      console.error('Error applying theme:', error);
      toast.error('Failed to apply theme');
    }
  };

  // Create new theme
  const createNewTheme = () => {
    setActiveTheme({ ...defaultTheme, name: 'New Theme' });
    setThemeName('New Theme');
  };

  // Delete theme
  const deleteTheme = async () => {
    if (!activeTheme.id) {
      toast.error('Cannot delete unsaved theme');
      return;
    }
    
    if (confirm('Are you sure you want to delete this theme?')) {
      try {
        await supabaseThemeService.deleteTheme(activeTheme.id);
        
        // Update themes list
        setThemes(prev => prev.filter(t => t.id !== activeTheme.id));
        
        // Reset to default theme
        setActiveTheme(defaultTheme);
        setThemeName(defaultTheme.name);
        
        toast.success('Theme deleted successfully');
      } catch (error) {
        console.error('Error deleting theme:', error);
        toast.error('Failed to delete theme');
      }
    }
  };

  // Apply theme to organization
  const applyToOrganization = async () => {
    if (!activeTheme.id && activeTheme !== defaultTheme) {
      toast.error('Please save the theme first');
      return;
    }
    
    if (confirm('Apply this theme to all users in your organization?')) {
      try {
        const themeId = activeTheme.id || 'default';
        await supabaseThemeService.applyThemeToOrganization(themeId);
        toast.success('Theme applied to organization successfully');
      } catch (error) {
        console.error('Error applying theme to organization:', error);
        toast.error('Failed to apply theme to organization');
      }
    }
  };

  // Export theme
  const exportTheme = () => {
    const themeJson = supabaseThemeService.exportTheme(activeTheme);
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTheme.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import theme
  const importTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const themeJson = event.target?.result as string;
          const importedTheme = supabaseThemeService.importTheme(themeJson);
          
          setActiveTheme(importedTheme);
          setThemeName(importedTheme.name);
          toast.success('Theme imported successfully');
        } catch (error) {
          console.error('Error importing theme:', error);
          toast.error('Failed to import theme');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  // Select a theme
  const selectTheme = (theme: Theme) => {
    setActiveTheme(theme);
    setThemeName(theme.name);
  };

  // If loading or not authenticated, show loading state
  if (loading || !user) {
    return <div className="p-8">Loading...</div>;
  }

  // If not premium, show upgrade message
  if (!isPremium) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <PremiumFeatureMessage 
          title="Theme Editor" 
          description="Customize your application's appearance with our powerful theme editor. Create, save, and share themes across your organization."
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div>
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="w-64"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={saveTheme} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Theme'}
              <SaveIcon className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" onClick={applyTheme}>
              Apply Theme
              <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={createNewTheme}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New
          </Button>
          
          <Button variant="outline" onClick={deleteTheme} disabled={!activeTheme.id}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </Button>
          
          <Button variant="outline" onClick={exportTheme}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Button variant="outline" onClick={importTheme}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Import
          </Button>
          
          <Button variant="outline" onClick={applyToOrganization}>
            Apply to Organization
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-[250px_1fr] gap-6">
        {/* Themes List */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Your Themes</h3>
          <div className="space-y-2">
            <div
              className={`p-2 rounded cursor-pointer ${activeTheme === defaultTheme ? 'bg-primary/10' : 'hover:bg-muted'}`}
              onClick={() => selectTheme(defaultTheme)}
            >
              Default Theme
            </div>
            
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-2 rounded cursor-pointer ${activeTheme.id === theme.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                onClick={() => selectTheme(theme)}
              >
                {theme.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Theme Editor */}
        <div className="border rounded-lg p-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'light' | 'dark')}>
            <TabsList className="mb-4">
              <TabsTrigger value="light">Light Mode</TabsTrigger>
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="light" className="space-y-6">
              {colorCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <h3 className="font-medium">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.colors.map((colorKey) => (
                      <div key={colorKey} className="space-y-1">
                        <Label className="capitalize">{colorKey.replace(/([A-Z])/g, ' $1')}</Label>
                        <ColorPicker
                          value={activeTheme.light.colors[colorKey as keyof ThemeColors]}
                          onChange={(value) => handleColorChange(colorKey, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="dark" className="space-y-6">
              {colorCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <h3 className="font-medium">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.colors.map((colorKey) => (
                      <div key={colorKey} className="space-y-1">
                        <Label className="capitalize">{colorKey.replace(/([A-Z])/g, ' $1')}</Label>
                        <ColorPicker
                          value={activeTheme.dark.colors[colorKey as keyof ThemeColors]}
                          onChange={(value) => handleColorChange(colorKey, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
