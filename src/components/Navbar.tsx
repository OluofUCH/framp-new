"use client";

import { 
  FaWallet, 
  FaBell,
  FaCog,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';
import { RiHome5Line } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      icon: RiHome5Line,
      label: 'Home',
      href: '/dashboard'
    },
    {
      icon: BiTransfer,
      label: 'Activity',
      href: '/dashboard/activity'
    },
    {
      icon: IoStatsChart,
      label: 'History',
      href: '/dashboard/history'
    },
    {
      icon: FaCog,
      label: 'Profile',
      href: '/dashboard/profile'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1F1F1F] border-t border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors`}
            >
              <Icon 
                className={`w-6 h-6 ${
                  active 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-300'
                }`} 
              />
              <span 
                className={`text-xs ${
                  active 
                    ? 'text-purple-600 dark:text-purple-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;