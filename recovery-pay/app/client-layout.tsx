'use client';

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from '../lib/auth-context';
import { ThemeProvider, useTheme } from '../lib/theme-context';

// Theme toggle button component
function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md hover:bg-muted transition-colors"
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDarkMode ? (
        // Sun icon for dark mode
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

// Layout content component
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we're in the dashboard area
  const isDashboard = pathname?.startsWith('/dashboard');
  
  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
  ];
  
  return (
    <AuthProvider>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl flex items-center gap-2">
              <span className="text-primary">Recovery</span>
              <span>Pay</span>
            </Link>
            
            {/* Main navigation */}
            <div className="hidden md:flex ml-10 space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            {/* Only show theme toggle in dashboard */}
            {isDashboard && <ThemeToggle />}
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        
        {/* Mobile navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex justify-between px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-border py-6 text-sm text-mutedForeground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">RecoveryPay</h3>
              <p className="mb-4">Simplifying payment management for recovery houses.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-primary transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/forgot-password" className="hover:text-primary transition-colors">
                    Reset Password
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p>© {new Date().getFullYear()} RecoveryPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AuthProvider>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
} 