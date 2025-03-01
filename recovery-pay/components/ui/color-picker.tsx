"use client"

import * as React from "react"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
  label?: string
  showPreview?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

// Predefined color palettes
const colorPalettes = {
  primary: ['#1a365d', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
  accent: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
  success: ['#064e3b', '#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
  error: ['#7f1d1d', '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2'],
  warning: ['#78350f', '#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fef3c7'],
  info: ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
  neutral: ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9', '#ffffff'],
  gray: ['#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6', '#ffffff']
}

// Debounce function to limit how often a function is called
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Lazy loaded color picker content
const ColorPickerContent = React.lazy(() => 
  Promise.resolve({
    default: ({ 
      internalColor, 
      customColor, 
      handleChange, 
      handleTextChange, 
      handleColorSelect, 
      applyCustomColor, 
      closeColorPicker, 
      saveAndClose, 
      showPreview, 
      onFocus, 
      onBlur 
    }: any) => {
      // Memoize the color palettes to prevent re-rendering
      const colorPaletteElements = React.useMemo(() => (
        Object.entries(colorPalettes).map(([name, colors]) => (
          <div key={name} className="space-y-1 mb-3">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{name}</div>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((paletteColor) => (
                <div
                  key={paletteColor}
                  className="w-7 h-7 rounded-md cursor-pointer border hover:scale-110 transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: paletteColor }}
                  onClick={() => handleColorSelect(paletteColor)}
                  title={paletteColor}
                />
              ))}
            </div>
          </div>
        ))
      ), [handleColorSelect]);
      
      // Memoize the preview to prevent re-rendering
      const colorPreview = React.useMemo(() => (
        showPreview && (
          <div className="pt-3 border-t">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Preview</div>
            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-md shadow-inner" style={{ backgroundColor: internalColor }}>
                <div className="text-xs font-medium text-white text-center">Text</div>
              </div>
              <div className="flex-1 p-3 rounded-md bg-white border shadow-inner">
                <div className="text-xs font-medium text-center" style={{ color: internalColor }}>Text</div>
              </div>
            </div>
          </div>
        )
      ), [internalColor, showPreview]);
      
      return (
        <div className="space-y-5 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <Label htmlFor="color-input" className="text-lg font-semibold">Color Picker</Label>
            <div className="text-sm bg-muted/50 px-2 py-1 rounded-md font-mono">{internalColor}</div>
          </div>
          
          {/* Selected color preview */}
          <div 
            className="h-20 rounded-lg shadow-md transition-all duration-300 relative overflow-hidden"
            style={{ 
              backgroundColor: internalColor,
              backgroundImage: `linear-gradient(to bottom right, ${internalColor}99, ${internalColor})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
          
          {/* Standard color picker */}
          <div className="pt-3">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Color Picker</div>
            <input
              id="color-input"
              type="color"
              value={internalColor}
              onChange={handleChange}
              className="w-full h-12 cursor-pointer rounded-md shadow-sm transition-all hover:shadow-md"
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          
          {/* Custom color input */}
          <div className="pt-3 border-t">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Custom Color</div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={customColor}
                onChange={handleTextChange}
                className="flex-1 h-10 rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-1 text-sm shadow-sm transition-all focus:shadow-md"
                placeholder="#000000"
              />
              <button 
                onClick={applyCustomColor}
                className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
              >
                Apply
              </button>
            </div>
          </div>
          
          {/* Color palettes */}
          <div className="pt-3 border-t space-y-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Color Palettes</div>
            {colorPaletteElements}
          </div>
          
          {colorPreview}
          
          {/* Action buttons */}
          <div className="pt-4 border-t flex justify-end gap-3">
            <button 
              onClick={closeColorPicker}
              className="px-4 py-2 text-sm bg-muted/70 backdrop-blur-sm text-muted-foreground rounded-md hover:bg-muted transition-all shadow-sm hover:shadow-md"
            >
              Close
            </button>
            <button 
              onClick={saveAndClose}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Save
            </button>
          </div>
        </div>
      );
    }
  })
);

export function ColorPicker({ 
  value, 
  onChange, 
  className,
  label,
  showPreview = true,
  onFocus,
  onBlur
}: ColorPickerProps) {
  // Use internal state for the color to avoid re-renders
  const [internalColor, setInternalColor] = React.useState(value || "#000000");
  const [isOpen, setIsOpen] = React.useState(false);
  const [customColor, setCustomColor] = React.useState(value || "#000000");
  
  // Update internal state when the prop changes
  React.useEffect(() => {
    if (value !== internalColor) {
      setInternalColor(value || "#000000");
      setCustomColor(value || "#000000");
    }
  }, [value, internalColor]);
  
  // Memoize handlers to prevent recreating functions on each render
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInternalColor(newColor);
    setCustomColor(newColor);
    // Update parent immediately to fix the color update issue
    onChange(newColor);
  }, [onChange]);

  const handleTextChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    
    // Only update if it's a valid color format
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(newColor)) {
      setInternalColor(newColor);
      // Update parent immediately
      onChange(newColor);
    }
  }, [onChange]);

  const handleColorSelect = React.useCallback((newColor: string) => {
    setInternalColor(newColor);
    setCustomColor(newColor);
    // Update parent immediately
    onChange(newColor);
  }, [onChange]);

  const handleFocus = React.useCallback(() => {
    if (onFocus) onFocus();
    setIsOpen(true);
  }, [onFocus]);

  const handleBlur = React.useCallback(() => {
    if (onBlur) onBlur();
    // Don't close on blur anymore
  }, [onBlur]);

  const applyCustomColor = React.useCallback(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(customColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(customColor)) {
      setInternalColor(customColor);
      // Update parent immediately
      onChange(customColor);
    }
  }, [customColor, onChange]);

  const closeColorPicker = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const saveAndClose = React.useCallback(() => {
    // Ensure we update the parent with the current color
    onChange(internalColor);
    setIsOpen(false);
  }, [onChange, internalColor]);
  
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      {label && <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</Label>}
      <div className="flex items-center gap-3">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div 
              className="w-12 h-12 rounded-md border cursor-pointer shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md relative overflow-hidden" 
              style={{ 
                backgroundColor: internalColor,
                backgroundImage: `linear-gradient(to bottom right, ${internalColor}99, ${internalColor})`
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={() => setIsOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[350px] p-5 backdrop-blur-sm bg-background/95 border border-border/40 shadow-xl rounded-xl" 
            align="center" 
            sideOffset={8}
            centerScreen={true}
          >
            {isOpen && (
              <React.Suspense fallback={
                <div className="h-60 flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-8 h-8 bg-muted/50 rounded-full mb-2"></div>
                    <div className="text-sm text-muted-foreground">Loading color picker...</div>
                  </div>
                </div>
              }>
                <ColorPickerContent 
                  internalColor={internalColor}
                  customColor={customColor}
                  handleChange={handleChange}
                  handleTextChange={handleTextChange}
                  handleColorSelect={handleColorSelect}
                  applyCustomColor={applyCustomColor}
                  closeColorPicker={closeColorPicker}
                  saveAndClose={saveAndClose}
                  showPreview={showPreview}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </React.Suspense>
            )}
          </PopoverContent>
        </Popover>
        <input
          type="text"
          value={internalColor}
          onChange={handleTextChange}
          className="flex h-12 rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm shadow-sm transition-all focus:shadow-md"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
} 