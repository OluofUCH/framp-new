"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

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
          console.log(data);
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
      // Sign out using Supabase
      // const supabase = createBrowserClient(
      //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
      //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      // );
      // await supabase.auth.signOut();

      // Call logout API to clear cookies/session on server
      await fetch("/api/auth/logout", { method: "POST" });

      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
    console.log(error);
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

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
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
        <p className="text-white/70 mb-4">{error || "Authentication required"}</p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/frampapplogo.webp" alt="Logo" className="h-8" />☺
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>☺
      </header>
  
      {/* Dashboard Content */}
      <section className="container mx-auto px-4 py-10 space-y-8">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {userData.profile?.email || "Investor"} 👋</h2>
          <p className="text-gray-400 mt-1">Here's your account overview.</p>
        </div>
  
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow">
            <p className="text-sm text-gray-400">Total Balance</p>
            <p className="text-2xl font-semibold mt-2">$12,850.42</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow">
            <p className="text-sm text-gray-400">Wallet Address</p>
            <p className="mt-2 text-purple-400 break-words">
              {userData.profile?.wallet_address || "Not connected"}
            </p>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow">
            <p className="text-sm text-gray-400">Recent Activity</p>
            <p className="mt-2 text-green-400">+$250.00 Deposited</p>
          </div>
        </div>
  
        {/* Quick Links and Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/transfer"
                className="block w-full text-center py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Transfer Funds
              </Link>
              <Link
                href="/dashboard/profile"
                className="block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Edit Profile
              </Link>
              <Link
                href="/dashboard/wallet"
                className="block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Connect Wallet
              </Link>
            </div>
          </div>
  
          {/* Recent Transactions */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Recent Transactions</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm text-gray-300">
                <span>Payment to Alpha Bank</span>
                <span>− $120.00</span>
              </li>
              <li className="flex justify-between text-sm text-gray-300">
                <span>Salary Deposit</span>
                <span className="text-green-400">+ $1,500.00</span>
              </li>
              <li className="flex justify-between text-sm text-gray-300">
                <span>Transfer from Wallet</span>
                <span className="text-green-400">+ $300.00</span>
              </li>
            </ul>
          </div>
        </div>
  
        {/* Footer Note */}
        <footer className="pt-10 text-center border-t border-gray-800 text-sm text-gray-500">
          Powered by Framp Finance. Secure. Simple. Smart.
        </footer>
      </section>
    </main>
  );
  
}
