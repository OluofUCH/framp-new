"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaExchangeAlt,
  FaUser,
  FaCreditCard,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
  FaBell,
  FaChartLine,
} from "react-icons/fa";
import { RiSendPlaneFill, RiNotificationLine } from "react-icons/ri";
import { BackgroundElements } from "@/components/ui/BackgroundElements";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("api/auth/me");

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
        console.log(data.user);
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
    console.log(error);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <BackgroundElements />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-6 h-6 border-2 border-[#7b77b9] border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
          <p className="text-black/70 dark:text-white/70 text-lg">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <BackgroundElements />
        <motion.div
          className="relative z-10 text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-black/70 dark:text-white/70 mb-6">
            {error || "Please log in to access your dashboard"}
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-background relative overflow-hidden">
      <BackgroundElements />
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/frampapplogo.webp" alt="Framp" className="h-8" />
              <span className="text-xl font-bold text-black dark:text-white">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <RiNotificationLine className="h-5 w-5 text-black/70 dark:text-white/70" />
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Welcome back, {userData.profile?.email?.split('@')[0] || "Investor"} 👋
          </h1>
          <p className="text-black/70 dark:text-white/70">
            Here's your financial overview for today
          </p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          className="bg-gradient-to-br from-[#7b77b9] to-[#7b77b9]/80 rounded-2xl p-8 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/80 text-sm mb-2">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold">
                    {showBalance ? "$12,850.42" : "••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {showBalance ? (
                      <FaEyeSlash className="h-4 w-4" />
                    ) : (
                      <FaEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">24h Change</p>
                <p className="text-green-300 font-semibold flex items-center gap-1">
                  <FaArrowUp className="h-3 w-3" />
                  +2.5%
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-3 px-4 backdrop-blur-sm transition-colors">
                <RiSendPlaneFill className="h-5 w-5 mb-1 mx-auto" />
                <p className="text-sm font-medium">Send</p>
              </button>
              <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-3 px-4 backdrop-blur-sm transition-colors">
                <FaArrowDown className="h-5 w-5 mb-1 mx-auto" />
                <p className="text-sm font-medium">Receive</p>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="bg-white dark:bg-background/50 p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <FaWallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-500 text-sm font-medium">Active</span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-sm mb-1">Wallet Address</p>
            <p className="text-black dark:text-white font-mono text-sm break-all">
              {userData.profile?.wallet_address || "Not connected"}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white dark:bg-background/50 p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <FaArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-sm mb-1">Recent Activity</p>
            <p className="text-black dark:text-white font-semibold">
              +$250.00 Deposited
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white dark:bg-background/50 p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <FaChartLine className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-blue-500 text-sm font-medium">Portfolio</span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-sm mb-1">Total Assets</p>
            <p className="text-black dark:text-white font-semibold">
              5 Currencies
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="bg-white dark:bg-background/50 p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-black dark:text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#7b77b9]/20 flex items-center justify-center">
                <FaExchangeAlt className="h-3 w-3 text-[#7b77b9]" />
              </div>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link
                href="/dashboard/transfer"
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 dark:bg-muted/20 hover:bg-[#7b77b9]/10 dark:hover:bg-[#7b77b9]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center group-hover:bg-[#7b77b9]/20">
                  <RiSendPlaneFill className="h-4 w-4 text-[#7b77b9]" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">Transfer Funds</p>
                  <p className="text-sm text-black/60 dark:text-white/60">Send money instantly</p>
                </div>
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 dark:bg-muted/20 hover:bg-[#7b77b9]/10 dark:hover:bg-[#7b77b9]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center group-hover:bg-[#7b77b9]/20">
                  <FaUser className="h-4 w-4 text-[#7b77b9]" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">Edit Profile</p>
                  <p className="text-sm text-black/60 dark:text-white/60">Update your information</p>
                </div>
              </Link>

              <Link
                href="/dashboard/wallet"
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 dark:bg-muted/20 hover:bg-[#7b77b9]/10 dark:hover:bg-[#7b77b9]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center group-hover:bg-[#7b77b9]/20">
                  <FaWallet className="h-4 w-4 text-[#7b77b9]" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">Connect Wallet</p>
                  <p className="text-sm text-black/60 dark:text-white/60">Link your crypto wallet</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            className="bg-white dark:bg-background/50 p-6 rounded-xl border border-black/10 dark:border-white/10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-black dark:text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#7b77b9]/20 flex items-center justify-center">
                <FaChartLine className="h-3 w-3 text-[#7b77b9]" />
              </div>
              Recent Transactions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 dark:bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <FaArrowUp className="h-4 w-4 text-red-500 rotate-45" />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">Payment to Alpha Bank</p>
                    <p className="text-sm text-black/60 dark:text-white/60">Today, 2:30 PM</p>
                  </div>
                </div>
                <p className="font-semibold text-red-500">-$120.00</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 dark:bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <FaArrowDown className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">Salary Deposit</p>
                    <p className="text-sm text-black/60 dark:text-white/60">Yesterday, 9:00 AM</p>
                  </div>
                </div>
                <p className="font-semibold text-green-500">+$1,500.00</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 dark:bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <FaWallet className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">Transfer from Wallet</p>
                    <p className="text-sm text-black/60 dark:text-white/60">2 days ago</p>
                  </div>
                </div>
                <p className="font-semibold text-green-500">+$300.00</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-[#7b77b9] hover:text-[#7b77b9]/80 font-medium transition-colors">
              View All Transactions
            </button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="pt-8 text-center border-t border-black/10 dark:border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-black/60 dark:text-white/60 text-sm">
            Powered by <span className="text-[#7b77b9] font-semibold">Framp Finance</span> 
            · Secure · Simple · Smart
          </p>
        </motion.footer>
      </section>
    </main>
  );
}