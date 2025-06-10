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
import { ArrowLeft } from "lucide-react";
import { IoStatsChart } from 'react-icons/io5';
import Image from 'next/image';

const DashboardPage = () => {
  const [isDark, setIsDark] = useState(false);
  const logoSrc = "/images/logo.svg";
  const logoSrc2 = "/images/frampo.svg";
  const logoSrc3 = "/images/image 3.svg";
  const logoSrc4 = "/images/aud.svg";
  
  const logoSrc7 = "/images/offramp.svg";
  const logoSrc8 = "/images/onramp.svg";
  const logoSrc9 = "/images/utility.svg";
  const logoSrc10 = "/images/save.svg";
  const logo11 = "/images/fr.svg";
  
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
      icon: logoSrc8,
      color: 'bg-[#E3E2F5]'
    },
    {
      id: 2,
      title: 'Offramp',
      description: 'Convert your crypto to cash',
      icon: logoSrc7,
      color: 'bg-[#E3E2F5]'
    },
    {
      id: 3,
      title: 'Utility',
      description: 'Pay bill and Utilities easily',
      icon: logoSrc9,
      color: 'bg-[#E3E2F5]'
    },
    {
      id: 4,  
      title: 'Safe Box',
      description: 'Save daily, weekly or monthly',
      icon: logoSrc10,
      color: 'bg-[#E3E2F5]'
    }
  ];
  
  const handle = () => {
    window.location.href="/dashboard";
  }

  return (
    // Outer container with full height and centering
    <div className={`min-h-screen w-full flex justify-center ${isDark ? 'dark bg-[#1F1F1F]' : 'bg-gray-100'}`}>
      {/* Mobile container with fixed max width */}
      <div className={`w-full max-w-sm ${isDark ? 'dark bg-[#1F1F1F]' : 'bg-white'} shadow-xl`}>
        {/* Header */}
        <header className="px-4 pt-4 pb-2 flex items-center justify-between">
          <button onClick={handle} className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className={`text-xl font-semibold ${isDark ? 'dark text-white' : 'text-gray-900'}`}>Activity</h1>
          <button className="p-2">
          </button>
        </header>

        {/* Card Section */}
        <div className="px-4 py-4">
          <div className={`${isDark ? 'dark bg-[#F5A623]' : 'bg-[#C44FE2]'} rounded-xl p-4 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-[0]">
                <Image 
                  src={logoSrc2} 
                  alt="Framp" 
                  width={80} 
                  height={24}
                  className="h-6 w-auto"
                />
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
            <div className="text-xl justify-between rounded-lg flex p-1">
              <Image 
                src={logoSrc3} 
                alt="Framp" 
                width={180} 
                height={180}
                className="h-12 w-auto"
              />
              <Image 
                src={logo11} 
                alt="Framp" 
                width={180} 
                height={180}
                className="h-[150px] w-auto"
              />
            </div>
            <div className="flex items-cente justify-center gap-2 mt-[-60px]">
              <div className=" text-[26px] text-white rounded-lg px-4 py-2 pt-0">
                2345 **** **** 5487
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-4 h-64">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Utility - Short */}
              <div className={`${features[0].color} rounded-2xl p-4 h-20 flex flex-col justify-between shadow-sm`}>
                <span className="text-2xl">
                  <Image 
                    src={features[0].icon} 
                    alt="Framp" 
                    width={80} 
                    height={24}
                    className="h-6 w-auto"
                  />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs">{features[0].title}</h3>
                  <p className="text-[10px] text-nowrap text-gray-600 mt-1">{features[0].description}</p>
                </div>
              </div>

              {/* Onramp - Tall */}
              <div className={`${features[2].color} rounded-2xl p-4 flex-1 flex flex-col pt-6 shadow-sm`}>
                <span className="text-2xl">
                  <Image 
                    src={features[2].icon} 
                    alt="Framp" 
                    width={80} 
                    height={24}
                    className="h-6 w-auto"
                  />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{features[2].title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{features[2].description}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {/* Safe Box - Tall */}
              <div className={`${features[1].color} rounded-2xl p-4 flex-1 flex flex-col pt-6 shadow-sm`}>
                <span className="text-2xl">
                  <Image 
                    src={features[1].icon} 
                    alt="Framp" 
                    width={80} 
                    height={24}
                    className="h-6 w-auto"
                  />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{features[1].title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{features[1].description}</p>
                </div>
              </div>

              {/* Offramp - Short */}
              <div className={`${features[3].color} rounded-2xl p-4 h-20 flex flex-col justify-between shadow-sm`}>
                <span className="text-2xl">
                  <Image 
                    src={features[3].icon} 
                    alt="Framp" 
                    width={80} 
                    height={24}
                    className="h-6 w-auto"
                  />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs">{features[3].title}</h3>
                  <p className="text-[10px] text-nowrap text-gray-600 mt-1">{features[3].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;