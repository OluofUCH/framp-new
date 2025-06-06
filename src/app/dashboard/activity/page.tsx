"use client"
import React, { useState, useEffect } from 'react';
import { 
  FaWallet, 
  FaBell,
  FaCog,
  FaSun,
  FaMoon,
  FaHome,
  FaHistory,
  FaUser
} from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import Image from 'next/image';

const DashboardPage = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
  }, []);

  // Update theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const features = [
    {
      id: 1,
      title: 'Onramp',
      description: 'Convert your cash to crypto',
      icon: '💰',
      color: 'bg-purple-100'
    },
    {
      id: 2,
      title: 'Offramp',
      description: 'Convert your crypto to cash',
      icon: '🔄',
      color: 'bg-gray-100'
    },
    {
      id: 3,
      title: 'Utility',
      description: 'Pay bill and Utilities easily',
      icon: '🔌',
      color: 'bg-pink-100'
    },
    {
      id: 4,
      title: 'Safe Box',
      description: 'Save daily, weekly or monthly',
      icon: '🔒',
      color: 'bg-green-100'
    }
  ];
  const logoSrc = "/images/logo.svg";
  const logoSrc2 = "/images/as.png";
  const logoSrc3 = "/images/image 3.png";
  const logoSrc4 = "/images/Vector.png";
  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#1F1F1F]' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="px-4 pt-4 pb-2 flex items-center justify-between">
        <button className="p-2">
          <FaHistory className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className={`text-xl font-semibold  ${isDark ? 'dark text-white' : 'text-gray-900'}`}>Activity</h1>
        <button className="p-2">
        </button>
      </header>

      {/* Card Section */}
      <div className="px-4 py-4">
        <div className="bg-[#F5A623] rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-[0]">
          <Image 
              src={logoSrc2} 
              alt="Framp" 
              width={80} 
              height={24}
              className="h-6 w-auto"
            />
            <p>ramp</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-2xl">
              <Image 
              src={logoSrc4} 
              alt="Framp" 
              width={80} 
              height={24}
              className="h-6 w-auto"
            />
              </span>
            </div>
          </div>
          <div className="text-xl rounded-lg p-1">
          <Image 
              src={logoSrc3} 
              alt="Framp" 
              width={180} 
              height={180}
              className="h-12 w-auto"
            />
            </div>
          <div className="flex items-cente justify-center gap-2 mt-4">
            <div className=" text-[20px] rounded-lg px-4 py-2">
              Coming soon...
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          {features.map(feature => (
            <div 
              key={feature.id} 
              className={`${feature.color} rounded-xl p-4 h-32 flex flex-col justify-between`}
            >
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default DashboardPage;