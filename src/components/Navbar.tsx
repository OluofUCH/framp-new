"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []); 

  const navItems = [
    { icon: "/images/home.svg", icon2: "/images/homeact.svg", label: 'Home', href: '/dashboard' },
    { icon: "/images/act.svg", icon2: "/images/actact.svg", label: 'Activity', href: '/dashboard/activity' },
    { icon: "/images/hist.svg", icon2: "/images/histact.svg", label: 'History', href: '/dashboard/history' },
    { icon: "/images/prof.svg", icon2: "/images/profact.svg", label: 'Profile', href: '/dashboard/profile' }
  ];

  if (!hasMounted) return null; // Prevent hydration mismatch

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white dark:bg-[#1F1F1F] border-t border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 transition-colors">
              <Image 
                src={active ? item.icon2 : item.icon}
                alt="Framp"
                width={10}
                height={10}
                className="h-[29px] w-auto"
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;