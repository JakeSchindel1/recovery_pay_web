"use client"

import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "outline":
          return "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        case "ghost":
          return "hover:bg-accent hover:text-accent-foreground"
        case "link":
          return "text-primary underline-offset-4 hover:underline"
        default:
          return "bg-primary text-primary-foreground hover:bg-primary/90"
      }
    }
    
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-9 px-3 text-xs"
        case "lg":
          return "h-11 px-8 text-base"
        default:
          return "h-10 px-4 py-2 text-sm"
      }
    }
    
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none"
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className || ''}`}
        {...props}
      />
    )
  }
)

Button.displayName = "Button" 