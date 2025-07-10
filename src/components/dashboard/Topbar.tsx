"use client"
import React, { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaEyeSlash
} from 'react-icons/fa';
import Image from 'next/image';

interface TopbarProps {
  name: string;
}

const Topbar = (props: TopbarProps) => {
  const morn = "/images/morning.svg";
  const aft = "/images/afternoon.svg";
  const eve = "/images/evening.svg";
  const nig = "/images/night.svg";
  const logo14 = "/images/sun.svg";
  const logo15 = "/images/moon.svg";
  
const logoSrc2 = "/images/notification.svg";
  const [isDark, setIsDark] = useState(false);
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
    
      const toggleTheme = () => {
        setIsDark(!isDark);
      };
   
      const [time, setTime] = useState("");
      const [logs, setLogs] = useState("");
        useEffect(() => {
          const hour = new Date().getHours();
          if (hour >= 5 && hour < 12) {
            setTime("Good Morning");
            setLogs(morn);
          } else if (hour >= 12 && hour < 17) {
            setTime("Good Afternoon");
            setLogs(aft);
          } else if (hour >= 17 && hour < 20) {
            setTime("Good Evening");
            setLogs(eve);
          } else {
            setTime("Good Night");
            setLogs(nig);
          }
        }, []);
    return(
  <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-100 flex items-center justify-center">
                <span>👤</span>
              </div>

              <div className="flex flex-col gap-0 py-0">
                <div className="flex items-center text-sm text-[16px]">
                  <p className="text-sm font-light text-gray-600 dark:text-white">Hello,</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {props.name}
                  
                    </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-light text-gray-600 dark:text-white">{time}</p>      
                  <Image 
                    src={logs} 
                    alt="Framp" 
                    width={10} 
                    height={10}
                    className="h-[10px] w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {isDark ?  <Image 
                  src={logo14} 
                  alt="Framp" 
                  width={10} 
                  height={10}
                  className="h-[14px] w-auto"
                />:  <Image 
                  src={logo15} 
                  alt="Framp" 
                  width={10} 
                  height={10}
                  className="h-[14px] w-auto"
                />}
              </button>
              <button className="p-2 rounded-md bg-gray-200 dark:bg-[#E3E2F5] text-gray-600 dark:text-gray-300">
                <Image 
                  src={logoSrc2} 
                  alt="Framp" 
                  width={10} 
                  height={10}
                  className="h-[14px] w-auto"
                />
              </button>
            </div>
          </div>
    );
}
export default Topbar;