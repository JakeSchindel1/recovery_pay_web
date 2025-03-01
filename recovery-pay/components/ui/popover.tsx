"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const PopoverContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => {},
})

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(open || false)
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])
  
  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen)
    }
  }, [isOpen, onOpenChange])
  
  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  const { open, setOpen } = React.useContext(PopoverContext)
  
  const handleClick = () => {
    setOpen(!open)
  }
  
  // Instead of using cloneElement which can cause type issues,
  // we'll just wrap the children in a div with the click handler
  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  )
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
  sideOffset?: number
  centerScreen?: boolean
}

export function PopoverContent({ 
  children, 
  className = "",
  align = "center",
  sideOffset = 4,
  centerScreen = false
}: PopoverContentProps) {
  const { open } = React.useContext(PopoverContext)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  
  // Memoize position calculation to improve performance
  const calculatePosition = React.useCallback(() => {
    if (centerScreen) {
      // Position in the center of the screen
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Add a small delay to ensure content is fully rendered
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            const contentWidth = contentRef.current.offsetWidth;
            const contentHeight = contentRef.current.offsetHeight;
            
            setPosition({
              left: (windowWidth / 2) - (contentWidth / 2),
              top: (windowHeight / 2) - (contentHeight / 2)
            });
          }
        });
      }, 10); // Small delay to ensure content is rendered
    } else {
      // Find the trigger element (parent of the PopoverTrigger)
      const triggerElement = document.activeElement as HTMLElement;
      if (triggerElement) {
        triggerRef.current = triggerElement;
        
        // Get the trigger's position
        const triggerRect = triggerElement.getBoundingClientRect();
        
        // Calculate position based on alignment
        let left = 0;
        if (align === "center") {
          left = triggerRect.left + (triggerRect.width / 2);
        } else if (align === "start") {
          left = triggerRect.left;
        } else if (align === "end") {
          left = triggerRect.right;
        }
        
        // Position the content above the trigger by default
        let top = triggerRect.top - (contentRef.current?.offsetHeight || 0) - Math.abs(sideOffset);
        
        // If it would go off the top of the screen, position it below
        if (top < 10) {
          top = triggerRect.bottom + Math.abs(sideOffset);
        }
        
        setPosition({ top, left });
      }
    }
  }, [align, sideOffset, centerScreen]);
  
  React.useEffect(() => {
    if (open) {
      calculatePosition();
      
      // Recalculate on resize for better responsiveness
      const handleResize = () => {
        requestAnimationFrame(calculatePosition);
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [open, calculatePosition]);
  
  if (!open) return null
  
  let alignClass = centerScreen ? "" : "transform -translate-x-1/2"
  if (!centerScreen) {
    if (align === "start") alignClass = ""
    if (align === "end") alignClass = "transform -translate-x-full"
  }
  
  return (
    <>
      {/* Backdrop for center screen popovers */}
      {centerScreen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div 
        ref={contentRef}
        className={cn(
          "fixed z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg",
          alignClass,
          className,
          centerScreen ? 'shadow-xl' : ''
        )}
        style={{ 
          top: `${position.top}px`,
          left: `${position.left}px`,
          maxHeight: 'calc(100vh - 20px)',
          overflowY: 'auto',
          willChange: 'transform, opacity', // Improve performance
          transform: centerScreen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)', // Hardware acceleration
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  )
} 