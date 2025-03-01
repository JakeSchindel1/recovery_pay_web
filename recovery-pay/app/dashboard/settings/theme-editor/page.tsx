'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Theme, ThemeColors, defaultTheme } from '@/lib/themes';
import { supabaseThemeService } from '@/lib/supabase-theme-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/ui/color-picker';
import toast from '@/lib/mock-toast';
import { PlusIcon, TrashIcon, DownloadIcon, UploadIcon, SaveIcon, CheckIcon } from '@/lib/mock-icons';
import { PremiumFeatureMessage } from '@/components/premium-feature-message';
import React from 'react';

// Add animation keyframes
const globalStyles = `
@keyframes tab-switch {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}

.animate-tab-switch {
  animation: tab-switch 0.3s ease-in-out;
}

@keyframes pulse-highlight {
  0% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
}
`;

// Mock auth context
const useAuth = () => {
  return {
    user: { id: 'mock-user-id' },
    loading: false
  };
};

// Mock theme context
const useTheme = () => {
  return {
    theme: defaultTheme,
    setTheme: (mode: string, theme: Theme) => {
      console.log('Setting theme:', mode, theme);
    }
  };
};

export default function ThemeEditor() {
  const { user, loading } = useAuth();
  const { theme: currentTheme, setTheme } = useTheme();
  const router = useRouter();
  
  // Apply global styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // State for theme management
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme);
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);
  const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
  const [themeName, setThemeName] = useState('');
  const [isPremium, setIsPremium] = useState(true); // Set to true for development
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [tabSwitchAnimation, setTabSwitchAnimation] = useState<boolean>(false);
  
  // Color categories for organization
  const colorCategories = [
    {
      name: 'Primary Colors',
      description: 'These colors define your brand identity',
      colors: ['primary', 'secondary', 'accent']
    },
    {
      name: 'Background Colors',
      description: 'Used for page and component backgrounds',
      colors: ['background', 'backgroundSecondary']
    },
    {
      name: 'Text Colors',
      description: 'Used for text content throughout the app',
      colors: ['text', 'textSecondary', 'textMuted']
    },
    {
      name: 'Status Colors',
      description: 'Used to indicate different states and notifications',
      colors: ['success', 'error', 'warning', 'info']
    },
    {
      name: 'Border Colors',
      description: 'Used for separators and boundaries',
      colors: ['border', 'borderLight']
    },
    {
      name: 'Button Colors',
      description: 'Used for interactive elements',
      colors: ['buttonBackground', 'buttonText', 'buttonSecondaryBackground', 'buttonSecondaryText']
    }
  ];

  // Load user themes
  useEffect(() => {
    async function loadThemes() {
      try {
        setIsLoading(true);
        
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
  }, []);

  // Handle color change
  const handleColorChange = useCallback((colorKey: string, value: string) => {
    // Update theme immediately
    setActiveTheme(prev => {
      const variant = activeTab === 'light' ? { ...prev.light } : { ...prev.dark };
      variant.colors = { ...variant.colors, [colorKey]: value };
      
      return {
        ...prev,
        [activeTab]: variant
      };
    });
    
    // Highlight for a few seconds - use requestAnimationFrame for better performance
    setHighlightedColor(colorKey);
    
    // Clear any existing timeout
    if (window.highlightTimeout) {
      clearTimeout(window.highlightTimeout);
    }
    
    // Use requestAnimationFrame for smoother animation
    window.highlightTimeout = setTimeout(() => {
      // Use requestAnimationFrame to ensure this happens during an idle frame
      requestAnimationFrame(() => {
        setHighlightedColor(null);
      });
    }, 2000);
  }, [activeTab]);

  // Reset comparison
  const resetComparison = () => {
    setPreviousTheme(null);
    setShowComparison(false);
  };

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
    
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
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

  // Toggle premium mode for development
  const togglePremium = () => {
    setIsPremium(!isPremium);
  };

  // If not premium, show upgrade message
  if (!isPremium) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <PremiumFeatureMessage 
          title="Theme Editor Pro" 
          description="Customize your application's appearance with our powerful theme editor. Create, save, and share themes across your organization."
          ctaText="Simulate Premium User"
          onCtaClick={togglePremium}
        />
      </div>
    );
  }

  // Phone preview component - memoize to prevent re-renders
  const PhonePreview = React.memo(() => {
    const variant = activeTab === 'light' ? activeTheme.light : activeTheme.dark;
    const colors = variant.colors;
    
    // Mock data for the preview
    const mockPaymentStatus = {
      streak: 6,
      lastPaymentDate: "15 days ago",
      nextPaymentDue: "April 1, 2024",
      balance: 500,
      rentAmount: 500
    };
    
    const mockNotification = {
      title: "Payment Reminder",
      message: "Your next payment of $500 is due on April 1st",
      timestamp: "2h ago",
      priority: "high",
      read: false
    };
    
    const quickActions = [
      { icon: "chart-bar", label: "History" },
      { icon: "life-ring", label: "Support" },
      { icon: "cog", label: "Settings" }
    ];

    // Helper function to add highlight effect - optimize to reduce layout thrashing
    const getHighlightStyle = useCallback((colorKey: string) => {
      if (highlightedColor === colorKey) {
        return {
          boxShadow: '0 0 0 2px #fff, 0 0 0 4px ' + colors[colorKey as keyof ThemeColors],
          transition: 'all 0.2s ease-in-out',
          transform: 'scale(1.03)'
        };
      }
      return {};
    }, [highlightedColor, colors]);

    // Helper function to render icons
    const renderIcon = (name: string) => {
      switch (name) {
        case 'user':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
        case 'bell':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
        case 'calendar':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
        case 'credit-card':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
        case 'chart-bar':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="2" y1="20" x2="22" y2="20"></line></svg>;
        case 'life-ring':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>;
        case 'cog':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
        case 'home':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        case 'users':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
        case 'dollar-sign':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
        case 'signal':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 15l6-6 6 6"></path></svg>;
        case 'activity':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
        case 'battery':
          return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>;
        default:
          return <span>{name}</span>;
      }
    };
    
    return (
      <div className="relative">
        {/* Phone frame with modern design */}
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-gray-700 to-gray-900 shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(255,255,255,0.1)] transform rotate-0 scale-[1.02] -z-10"></div>
        
        <div className="border-[3px] border-gray-800 rounded-[40px] w-[320px] h-[640px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {/* Camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-gray-900 rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-700 mr-6"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          </div>
          
          {/* Status bar */}
          <div 
            style={{ 
              backgroundColor: colors.background,
              ...getHighlightStyle('background')
            }} 
            className="h-8 flex justify-between items-center px-6 text-xs pt-3"
          >
            <span style={{ color: colors.text, ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {}) }}>9:41</span>
            <div className="flex space-x-2">
              <span style={{ color: colors.text, ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {}) }}>{renderIcon('signal')}</span>
              <span style={{ color: colors.text, ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {}) }}>{renderIcon('activity')}</span>
              <span style={{ color: colors.text, ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {}) }}>{renderIcon('battery')}</span>
            </div>
          </div>
          
          {/* App header */}
          <div 
            style={{ 
              backgroundColor: colors.background,
              ...getHighlightStyle('background')
            }} 
            className="h-16 flex items-center justify-between px-5"
          >
            <div 
              style={{ 
                color: colors.text,
                backgroundColor: `${colors.backgroundSecondary}80`,
                ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
              }} 
              className="w-9 h-9 flex items-center justify-center rounded-full shadow-sm"
            >
              {renderIcon('user')}
            </div>
            <span 
              style={{ 
                color: colors.text,
                ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
              }} 
              className="font-bold text-lg"
            >
              Serenity House
            </span>
            <div 
              style={{ 
                color: colors.text,
                backgroundColor: `${colors.backgroundSecondary}80`,
                ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
              }} 
              className="w-9 h-9 flex items-center justify-center rounded-full shadow-sm relative"
            >
              {renderIcon('bell')}
              <div 
                style={{ 
                  backgroundColor: colors.primary,
                  ...getHighlightStyle('primary')
                }} 
                className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-white"
              ></div>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div 
            style={{ 
              backgroundColor: colors.background,
              ...getHighlightStyle('background')
            }} 
            className="flex-1 p-5 space-y-5 h-[calc(100%-96px)] overflow-y-auto"
          >
            {/* Payment streak badge */}
            <div className="flex justify-center">
              <div 
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}40)`, 
                  color: colors.primary,
                  ...getHighlightStyle('primary')
                }} 
                className="px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm"
              >
                Half a year of on-time payments! 🏆
              </div>
            </div>
            
            {/* Amount section */}
            <div 
              style={{ 
                background: `linear-gradient(135deg, ${colors.backgroundSecondary}50, ${colors.backgroundSecondary}20)`,
                ...getHighlightStyle('backgroundSecondary')
              }}
              className="flex flex-col items-center mt-2 p-5 rounded-2xl shadow-sm backdrop-blur-sm"
            >
              <div 
                style={{ 
                  color: colors.textMuted,
                  ...(highlightedColor === 'textMuted' ? { fontWeight: 'bold' } : {})
                }} 
                className="text-sm mb-3"
              >
                Current Balance Due - Due {mockPaymentStatus.nextPaymentDue}
              </div>
              
              <div className="flex items-start">
                <span 
                  style={{ 
                    color: colors.text,
                    ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
                  }} 
                  className="text-2xl mt-1"
                >$</span>
                <span 
                  style={{ 
                    color: colors.text,
                    ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
                  }} 
                  className="text-5xl font-bold"
                >{mockPaymentStatus.balance}</span>
                <span 
                  style={{ 
                    color: colors.text,
                    ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
                  }} 
                  className="text-2xl mt-1"
                >.00</span>
              </div>
              
              <div className="mt-4 w-full">
                <button 
                  style={{ 
                    backgroundColor: colors.primary,
                    ...getHighlightStyle('primary')
                  }} 
                  className="w-full py-2.5 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Pay Now
                </button>
              </div>
            </div>
            
            {/* Notification */}
            <div 
              style={{ 
                backgroundColor: colors.backgroundSecondary,
                ...getHighlightStyle('backgroundSecondary')
              }} 
              className="rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div 
                  style={{ 
                    backgroundColor: `${colors.error}20`,
                    color: colors.error,
                    ...getHighlightStyle('error')
                  }} 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                >
                  {renderIcon('bell')}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span 
                        style={{ 
                          color: colors.text,
                          ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
                        }} 
                        className="font-medium text-sm"
                      >{mockNotification.title}</span>
                      <div 
                        style={{ 
                          backgroundColor: colors.primary,
                          ...getHighlightStyle('primary')
                        }} 
                        className="w-2 h-2 rounded-full ml-1"
                      ></div>
                    </div>
                    <div 
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.error}, ${colors.error}90)`,
                        ...getHighlightStyle('error')
                      }} 
                      className="px-2 py-0.5 rounded-full shadow-sm"
                    >
                      <span style={{ color: "#fff" }} className="text-[10px] font-bold">URGENT</span>
                    </div>
                  </div>
                  <div 
                    style={{ 
                      color: colors.textMuted,
                      ...(highlightedColor === 'textMuted' ? { fontWeight: 'bold' } : {})
                    }} 
                    className="text-xs mt-1"
                  >
                    {mockNotification.message}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.backgroundSecondary}80, ${colors.backgroundSecondary}40)`,
                    ...getHighlightStyle('backgroundSecondary')
                  }} 
                  className="p-3 rounded-xl flex flex-col items-center shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                >
                  <div 
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.background}90, ${colors.background}60)`,
                      ...getHighlightStyle('background')
                    }} 
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-2 shadow-sm"
                  >
                    <span 
                      style={{ 
                        color: colors.primary,
                        ...getHighlightStyle('primary')
                      }}
                    >{renderIcon(action.icon)}</span>
                  </div>
                  <span 
                    style={{ 
                      color: colors.text,
                      ...(highlightedColor === 'text' ? { fontWeight: 'bold' } : {})
                    }} 
                    className="text-xs font-medium"
                  >{action.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div 
            style={{ 
              background: `linear-gradient(to bottom, ${colors.backgroundSecondary}90, ${colors.backgroundSecondary})`,
              ...getHighlightStyle('backgroundSecondary')
            }} 
            className="h-16 flex justify-around items-center border-t backdrop-blur-sm"
          >
            <div 
              style={{ 
                color: colors.primary,
                ...getHighlightStyle('primary')
              }} 
              className="flex flex-col items-center"
            >
              <span className="text-xs">{renderIcon('home')}</span>
              <span className="text-xs font-medium mt-0.5">Home</span>
            </div>
            <div 
              style={{ 
                color: colors.textMuted,
                ...(highlightedColor === 'textMuted' ? { fontWeight: 'bold' } : {})
              }} 
              className="flex flex-col items-center"
            >
              <span className="text-xs">{renderIcon('users')}</span>
              <span className="text-xs font-medium mt-0.5">Residents</span>
            </div>
            <div 
              style={{ 
                color: colors.textMuted,
                ...(highlightedColor === 'textMuted' ? { fontWeight: 'bold' } : {})
              }} 
              className="flex flex-col items-center"
            >
              <span className="text-xs">{renderIcon('dollar-sign')}</span>
              <span className="text-xs font-medium mt-0.5">Payments</span>
            </div>
            <div 
              style={{ 
                color: colors.textMuted,
                ...(highlightedColor === 'textMuted' ? { fontWeight: 'bold' } : {})
              }} 
              className="flex flex-col items-center"
            >
              <span className="text-xs">{renderIcon('cog')}</span>
              <span className="text-xs font-medium mt-0.5">Settings</span>
            </div>
          </div>
        </div>
        
        {/* Power button */}
        <div className="absolute right-[-4px] top-[120px] w-[4px] h-[40px] bg-gray-700 rounded-r-md"></div>
        
        {/* Volume buttons */}
        <div className="absolute left-[-4px] top-[100px] w-[4px] h-[30px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute left-[-4px] top-[140px] w-[4px] h-[30px] bg-gray-700 rounded-l-md"></div>
      </div>
    );
  });

  // Add this function before the return statement
  const getColorDescription = (colorKey: string) => {
    switch (colorKey) {
      case 'primary':
        return 'Main brand color used for buttons, links, and highlights';
      case 'secondary':
        return 'Complementary color used for secondary elements';
      case 'accent':
        return 'Used for accents and to draw attention to specific elements';
      case 'background':
        return 'Main background color for pages and containers';
      case 'backgroundSecondary':
        return 'Used for cards, modals, and secondary containers';
      case 'text':
        return 'Primary text color for headings and body text';
      case 'textSecondary':
        return 'Used for secondary text like descriptions';
      case 'textMuted':
        return 'Used for less important text like hints and timestamps';
      case 'success':
        return 'Indicates successful actions or positive status';
      case 'error':
        return 'Indicates errors or destructive actions';
      case 'warning':
        return 'Indicates warnings or caution';
      case 'info':
        return 'Used for informational messages';
      case 'border':
        return 'Used for borders and dividers';
      case 'borderLight':
        return 'Used for subtle borders and separators';
      case 'buttonBackground':
        return 'Background color for primary buttons';
      case 'buttonText':
        return 'Text color for primary buttons';
      case 'buttonSecondaryBackground':
        return 'Background color for secondary buttons';
      case 'buttonSecondaryText':
        return 'Text color for secondary buttons';
      default:
        return '';
    }
  };

  // Add this state for tracking collapsed sections
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Add this function to toggle section collapse
  const toggleSection = (sectionName: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Memoize the color picker component to prevent unnecessary re-renders
  const MemoizedColorPicker = useCallback(({ colorKey, colorValue }: { colorKey: string, colorValue: string }) => {
    const formattedLabel = colorKey.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return (
      <div key={colorKey} className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{formattedLabel}</Label>
          <div className="text-xs text-muted-foreground">{colorValue}</div>
        </div>
        <div className="flex gap-3 items-center">
          <ColorPicker
            value={colorValue}
            onChange={(value) => handleColorChange(colorKey, value)}
            className="flex-1"
            onFocus={() => setHighlightedColor(colorKey)}
            onBlur={() => setHighlightedColor(null)}
          />
          <div className="flex-shrink-0 w-24 h-10 rounded-md flex items-center justify-center" 
            style={{ 
              backgroundColor: colorValue,
              color: colorKey.includes('background') ? 
                (activeTab === 'light' ? activeTheme.light.colors.text : activeTheme.dark.colors.text) : 
                '#ffffff',
              border: colorKey.includes('border') ? 
                (activeTab === 'light' ? '1px solid #e2e8f0' : '1px solid #4a5568') : 
                'none'
            }}
          >
            <span className="text-xs font-medium">Preview</span>
          </div>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {getColorDescription(colorKey)}
        </div>
      </div>
    );
  }, [activeTab, activeTheme, handleColorChange]);

  // Memoize the color category sections to prevent re-renders
  const renderColorCategory = useCallback((category: {
    name: string;
    description: string;
    colors: string[];
  }, isDark = false) => {
    const sectionKey = isDark ? category.name + '-dark' : category.name;
    const themeVariant = isDark ? activeTheme.dark : activeTheme.light;
    
    return (
      <div key={sectionKey} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-card/50 backdrop-blur-sm">
        <div 
          className="border-b p-4 bg-muted/30 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection(sectionKey)}
        >
          <div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="text-muted-foreground bg-background/80 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
            {collapsedSections[sectionKey] ? '▼' : '▲'}
          </div>
        </div>
        
        {!collapsedSections[sectionKey] && (
          <div className="p-5 space-y-6">
            {category.colors.map((colorKey: string) => {
              const colorValue = themeVariant.colors[colorKey as keyof ThemeColors];
              return <MemoizedColorPicker key={colorKey} colorKey={colorKey} colorValue={colorValue} />;
            })}
          </div>
        )}
      </div>
    );
  }, [activeTheme, collapsedSections, MemoizedColorPicker, toggleSection]);

  // Add this function for theme selection with animation
  const selectThemeWithAnimation = (theme: Theme) => {
    // Set temporary animation state
    setSelectedThemeId(theme.id || 'default');
    
    // Actual theme selection
    setActiveTheme(theme);
    setThemeName(theme.name);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setSelectedThemeId(null);
    }, 500);
  };

  // Create a function to handle tab switching with animation
  const handleTabSwitch = useCallback((value: string) => {
    // Start animation
    setTabSwitchAnimation(true);
    
    // Set active tab
    setActiveTab(value as 'light' | 'dark');
    
    // Reset animation after it completes
    setTimeout(() => {
      setTabSwitchAnimation(false);
    }, 300);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Theme Editor</h1>
          <p className="text-muted-foreground">Customize your app's appearance with colors that match your brand</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Input
            id="theme-name"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            className="w-64 h-11 shadow-sm focus:shadow-md transition-all duration-200 bg-background/80 backdrop-blur-sm"
            placeholder="Theme name"
          />
          
          <Button onClick={saveTheme} disabled={isSaving} className="h-11 shadow-sm hover:shadow-md transition-all duration-200">
            {isSaving ? 'Saving...' : 'Save Theme'}
            <SaveIcon className="ml-2 h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={applyTheme} className="h-11 shadow-sm hover:shadow-md transition-all duration-200">
            Apply Theme
            <CheckIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_320px] gap-6">
        {/* Themes List */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-md p-5 order-2 lg:order-1 h-fit border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Your Themes</h3>
            <Button variant="outline" onClick={createNewTheme} size="sm" className="shadow-sm hover:shadow-md transition-all duration-200">
              <PlusIcon className="mr-1 h-4 w-4" />
              New
            </Button>
          </div>
          
          <div className="space-y-1.5 mb-6 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
            <div
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeTheme === defaultTheme ? 'bg-primary/10 text-primary font-medium shadow-sm' : 'hover:bg-muted'
              } ${selectedThemeId === 'default' ? 'scale-[0.98] bg-primary/20' : ''}`}
              onClick={() => selectThemeWithAnimation(defaultTheme)}
            >
              Default Theme
            </div>
            
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTheme.id === theme.id ? 'bg-primary/10 text-primary font-medium shadow-sm' : 'hover:bg-muted'
                } ${selectedThemeId === theme.id ? 'scale-[0.98] bg-primary/20' : ''}`}
                onClick={() => selectThemeWithAnimation(theme)}
              >
                {theme.name}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={exportTheme} className="justify-start shadow-sm hover:shadow-md transition-all duration-200">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Theme
            </Button>
            
            <Button variant="outline" onClick={importTheme} className="justify-start shadow-sm hover:shadow-md transition-all duration-200">
              <UploadIcon className="mr-2 h-4 w-4" />
              Import Theme
            </Button>
            
            <Button variant="outline" onClick={deleteTheme} disabled={!activeTheme.id} className="justify-start text-error hover:text-error shadow-sm hover:shadow-md transition-all duration-200">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Theme
            </Button>
            
            <Button variant="outline" onClick={applyToOrganization} className="justify-start mt-2 shadow-sm hover:shadow-md transition-all duration-200">
              Apply to Organization
            </Button>
            
            {/* Development toggle */}
            <div className="mt-6 pt-4 border-t">
              <button 
                className="w-full bg-muted/70 hover:bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={togglePremium}
              >
                Simulate Free User
              </button>
            </div>
          </div>
        </div>
        
        {/* Theme Editor */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-md p-5 order-1 lg:order-2 overflow-hidden border border-border/40">
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabSwitch} 
            className={`w-full ${tabSwitchAnimation ? 'animate-tab-switch' : ''}`}
          >
            <TabsList className="mb-6 w-full h-12 shadow-sm">
              <TabsTrigger 
                value="light" 
                className="flex-1 h-10 data-[state=active]:shadow-md transition-all duration-200"
              >
                Light Mode
              </TabsTrigger>
              <TabsTrigger 
                value="dark" 
                className="flex-1 h-10 data-[state=active]:shadow-md transition-all duration-200"
              >
                Dark Mode
              </TabsTrigger>
            </TabsList>
            
            <div className={`overflow-y-auto max-h-[calc(100vh-250px)] pr-2 scrollbar-thin ${tabSwitchAnimation ? 'opacity-90 scale-[0.99]' : ''} transition-all duration-300`}>
              <TabsContent value="light" className="space-y-6 mt-0">
                {colorCategories.map((category) => renderColorCategory(category, false))}
              </TabsContent>
              
              <TabsContent value="dark" className="space-y-6 mt-0">
                {colorCategories.map((category) => renderColorCategory(category, true))}
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Phone Preview */}
        <div className="flex flex-col items-center bg-card/80 backdrop-blur-sm rounded-xl shadow-md p-5 order-3 h-fit sticky top-6 z-10 border border-border/40">
          <div className="mb-3 text-center">
            <div className="text-sm font-medium text-muted-foreground">Live Preview</div>
            <div className="text-xs text-muted-foreground mt-1">Changes are applied instantly</div>
          </div>
          <PhonePreview />
        </div>
      </div>
    </div>
  );
}

// Add this to the global Window interface
declare global {
  interface Window {
    highlightTimeout: number | NodeJS.Timeout;
  }
}
