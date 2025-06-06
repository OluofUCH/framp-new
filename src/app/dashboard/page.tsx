"use client"
import React, { useState, useEffect } from 'react';
import { 
  FaWallet, 
  FaBell,
  FaCog,
  FaSun,
  FaEye, 
  FaEyeSlash,
  FaMoon
} from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';
import { RiHome5Line } from 'react-icons/ri';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const transactions = [
    {
      id: 1,
      title: 'Flight',
      date: '27th May 2023, 5:23pm',
      amount: -216,
      icon: '✈️'
    },
    {
      id: 2,
      title: 'Netflix',
      date: '24th May 2023, 2:12pm',
      amount: -6.7,
      icon: 'N'
    },
    {
      id: 3,
      title: 'Received',
      date: '24th May 2023, 1:17pm',
      amount: 23456,
      icon: '↓'
    },
    {
      id: 4,
      title: 'Spotify',
      date: '21st May 2023, 9:51pm',
      amount: -2.2,
      icon: '🎵'
    },
    {
      id: 5,
      title: 'Sent',
      date: '21st May 2023, 11:45pm',
      amount: -2100,
      icon: '↑'
    }
  ];

  const currencies = [
    { id: 1, name: 'USDT', amount: 1024, change: 'up' },
    { id: 2, name: 'USDC', amount: 1.0587, change: 'down' },
    { id: 3, name: 'USD', amount: 1.12, change: 'up' }
  ];

  const logoSrc = "/images/scan.png";
  const logoSrc2 = "/images/notification.png";
  const logoSrc3 = "/images/as.png";
  const logoSrc4 = "/images/Vector.png";
  const [showBalance, setShowBalance] = useState(true);

  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
// useEffect((request: NextRequest)=>{
//  const sessionToken = request.cookies.get('session')?.value;


//     if (!sessionToken) {
//       console.log("No session token found in cookies, redirecting to login");
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
// },[])
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch user data");
        }

        const data = await res.json();
        setUserData(data.user);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Sign out using Supabase
     
      await fetch("/api/auth/logout", { method: "POST" });

      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 mb-4">
          <svg
            className="h-full w-full text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <p className="text-white/70">Loading dashboard...</p>
      </div>
    );
  }

 

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#1F1F1F]' : 'bg-white'}`}>
      {/* Header */}
      <header className="px-4 pt-2 pb-4">

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span>👤</span>
            </div>

            <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-sm font-light text-gray-600 dark:text-white">Hello,</p>
              <p className="font-semibold text-gray-900 dark:text-white">{userData.profile?.email?.split('@')[0]}</p>
            </div>
            <p className="text-sm font-light text-gray-600 dark:text-white">Good evening</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-md bg-gray-200 dark:bg-[#E3E2F5] text-gray-600 dark:text-gray-300">
               <Image 
                            src={logoSrc} 
                            alt="Framp" 
                            width={18} 
                            height={18}
                            className="h-4 w-auto"
                          />
            </button>
            <button className="p-2 rounded-md bg-gray-200 dark:bg-[#E3E2F5] text-gray-600 dark:text-gray-300">
            <Image 
                            src={logoSrc2} 
                            alt="Framp" 
                            width={18} 
                            height={18}
                            className="h-4 w-auto"
                          />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-tr from-[#7A73C1] via-[#443F91] to-[#161737] rounded-2xl p-4 text-white mb-6">
         <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-[0]">
                  <Image 
                      src={logoSrc3} 
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
          <div className="mb-4">
            <p className="text-sm opacity-80 mb-1">My Balance</p>
            <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-3xl font-bold">
                        {showBalance ? "$12,850.42" : "••••••••"}
                      </h2>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                      >
                        {showBalance ? (
                          <FaEyeSlash className="h-5 w-5" />
                        ) : (
                          <FaEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-lg px-0 py-1 text-[7px]">
              Wallet Connected
            </div>
          
          <div className="rounded-lg px-0 py-1 text-[14px]">
              **** **** 6848
            </div>
          </div>
        </div>

        {/* Currency List */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-0">
          {currencies.map(currency => (
            <div key={currency.id} className="flex-shrink-0 bg-[#E3E2F5] dark:bg-[#E3E2F5] rounded-xl p-4 min-w-[146px] shadow-sm">
              <div className="flex justify-between items-center mb-0">
                <span className="text-gray-900 dark:text-black font-bold">{currency.name}</span>
                <span className={currency.change === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {currency.change === 'up' ? '↑' : '↓'}
                </span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-black">$ {currency.amount}</p>

            </div>
          ))}
        </div>
      </header>

      {/* Transactions */}
      <main className="px-2">
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Transactions</h2>
          <button className="text-sm text-purple-600 dark:text-purple-400">See all</button>
        </div>
        <div className="space-y-4 overflow-y-scroll mb-[50px]">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between px-4 rounded-xl shadow-sm transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#E3E2F5] text-black dark:bg-[#E3E2F5] flex items-center justify-center">
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{transaction.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.amount > 0 
                  ? 'text-green-500 dark:text-green-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                ${Math.abs(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;