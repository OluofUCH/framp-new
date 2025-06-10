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
  const [time, setTime] = useState("");
  const [logs, setLogs] = useState("");

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
  const morn = "/images/morning.svg";
  const aft = "/images/afternoon.svg";
  const eve = "/images/evening.svg";
  const nig = "/images/night.svg";

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

  const logoSrc = "/images/scan.png";
  const logoSrc2 = "/images/notification.png";
  const logoSrc3 = "/images/as.png";
  const logoSrc4 = "/images/Vector.png";
  const logoSrc5 = "/images/Group.png";
  const logoSrc6 = "/images/sol.png";
  const logoSrc7 = "/images/offramp.png";
  const logoSrc8 = "/images/Onramp.png";
  const logoSrc9 = "/images/utility.png";
  const logoSrc10 = "/images/more.png";
  const logo11 = "/images/fr.svg";
  const logo12 = "/images/coin.svg";
  const logo13 = "/images/coin2.svg";
  const logo14 = "/images/sun.svg";
  const logo15 = "/images/moon.svg";

  const currencies = [
    { id: 1, name: 'USDT', amount: 1024, change: 'up', logo: logoSrc5, per: "0.01%" },
    { id: 2, name: 'USDC', amount: 1.0587, change: 'down', logo: logo12, per: "0.01%" },
    { id: 3, name: 'USD', amount: 1.12, change: 'up', logo: logo13, per: "0.01%" }
  ];
  const quickAccessItems = [
    { id: 1, name: 'Onramp', icon: logoSrc8, color: '#E3E2F5' },
    { id: 2, name: 'Utility', icon: logoSrc9, color: '#E3E2F5' },
    { id: 3, name: 'Offramp', icon: logoSrc7, color: '#E3E2F5' },
    { id: 4, name: 'More', icon: logoSrc10, color: '#E3E2F5' }
  ];


  const [showBalance, setShowBalance] = useState(true);

  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [als, setAls] = useState(false);
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
        setAls(true);
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

  if(als){
    window.location.href = "/login";

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-white/70">Login session expired</p>
        <p className="text-white/70">Navigating you to  login page</p>

      </div>
    );
  }

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
      <header className="px-4 pt-2 pb-0">

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span>👤</span>
            </div>

            <div className="flex flex-col gap-0 py-0">
            <div className="flex items-center text-sm text-[16px]">
              <p className="text-sm font-light text-gray-600 dark:text-white">Hello,</p>
              <p className="font-semibold text-gray-900 dark:text-white">{userData.profile?.email?.split('@')[0]}</p>
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

        {/* Balance Card */}
        <div className="bg-gradient-to-tr flex justify-between from-[#7A73C1] via-[#443F91] to-[#161737] rounded-2xl p-4 text-white mb-6">
        
          <div>
          <div className="flex flex-col items-start">
            <div className="rounded-lg px-0 py-0 text-[7px]">
              <div className="flex items-center gap-2">
              <Image 
                            src={logoSrc6} 
                            alt="Framp" 
                            width={14} 
                            height={14}
                            className="h-4 w-auto"
                          />
              Wallet Connected
              </div>
            </div>
          
          <div className="rounded-lg px-0 py-1 text-[14px]">
              **** **** 6848
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
          </div>
          <Image 
                      src={logo11} 
                      alt="Framp" 
                      width={14} 
                      height={14}
                      className="h-[130px] w-auto"
                    />
          </div>

       

        {/* Currency List */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-3">
          {currencies.map(currency => (
            <div key={currency.id} className=" flex flex-col bg-[#E3E2F5] dark:bg-[#E3E2F5] border-box rounded-xl p-2 py-0  w-1/3 h-[56px] shadow-sm">
              <div className="flex gap-2 items-center mt-2">
                <span className="text-gray-900 text-[14px] dark:text-black font-bold">{currency.name}</span>
                <span className={`text-[10px] ${currency.change === 'up' ? 'text-green-500' : 'text-red-500'} flex gap-2`}>
                {currency.per}
                  {currency.change === 'up' ? ' ↑' : ' ↓'}  
                  
                </span>
              </div>
              <div className="flex justify-between">
              <p className="font-bold text-[10px] text-gray-900 dark:text-black">$ {currency.amount}</p>
              <Image 
                      src={currency.logo} 
                      alt="Framp" 
                      width={14} 
                      height={14}
                      className="h-[20px] w-auto"
                    />
</div>
            </div>
          ))}
        </div>

           {/* Quick Access */}
           <div className="mb-4">
          <h3 className={`font-semibold text-gray-900 text-{18px} mb-3 ${isDark ? 'dark text-white' : 'text-black'}`}>Quick Access</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickAccessItems.map(item => (
              <div key={item.id} className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-md bg-[#E3E2F5] flex items-center justify-center mb-2`}>
                <Image 
                      src={item.icon} 
                      alt="Framp" 
                      width={80} 
                      height={24}
                      className="h-6 w-auto"
                    />
                </div>
                <span className={`text-xs ${isDark ? 'dark text-white' : 'text-black'} font-semi-bold text-center`}>{item.name}</span>
              </div>
            ))}
          </div>
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