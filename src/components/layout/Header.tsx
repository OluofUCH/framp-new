"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const logoSrc = theme === 'dark' ? "/images/logo-dark.svg" : "/images/logo.svg";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-black/80">
      <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 max-w-7xl mx-auto">
        <div className="Logo flex items-center">
          <Link href="/">
            {mounted && (
              <Image 
                src={logoSrc} 
                alt="Framp" 
                width={120} 
                height={40} 
                className="h-7 sm:h-8 md:h-10 w-auto"
              />
            )}
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full text-black dark:text-white h-8 w-8 sm:h-9 sm:w-9"
            >
              {theme === 'dark' ? <FaSun className="h-4 w-4 sm:h-5 sm:w-5" /> : <FaMoon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
