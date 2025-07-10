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
import Balance from "@/components/dashboard/balancecard";
import Currency from "@/components/dashboard/currency";
import Quick from "@/components/dashboard/quickaccess";
import Transaction from "@/components/dashboard/Transactions";
import Topbar from "@/components/dashboard/Topbar";
import Loading from "@/components/dashboard/loading";

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
  }, [ ]);

  // Update theme


  



  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [als, setAls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
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
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  // if(userData === null) {
  //   window.location.href = "/login";
  //   return (
  //     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
  //       <p className="text-white/70">Login session expired</p>
  //       <p className="text-white/70">Navigating you to login page</p>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
    <Loading />
    );
  }

  return (
    // Outer container with full height and centering
    <div className={`min-h-screen w-full flex justify-center dark:bg-[#1F1F2F] bg-gray-100`}>
      {/* Mobile container with fixed max width */}
      <div className={`w-full max-w-sm min-h-screen transition-colors duration-300 dark:bg-[#1F1F1F] bg-white shadow-xl`}>
        {/* Header */}
        <header className="px-4 pt-2 pb-0">
          <Topbar name="User" />

         <Balance />
      <Currency />
        

        <Quick />
        </header>

       <Transaction />
      </div>
    </div>
  );
};

export default DashboardPage;