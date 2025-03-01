'use client';

import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    setColor(value);
  }, [value]);

  // Handle color change from picker
  const handleChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  // Handle color change complete
  const handleChangeComplete = (newColor: any) => {
    onChange(newColor.hex);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-full h-10 rounded-md border flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ backgroundColor: color }}
        >
          <div className="flex-1"></div>
          <div className="bg-white rounded px-2 py-1 text-xs shadow-sm">
            {color}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none shadow-xl">
        <ChromePicker
          color={color}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
          disableAlpha
        />
      </PopoverContent>
    </Popover>
  );
} 