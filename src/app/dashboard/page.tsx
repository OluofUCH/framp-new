"use client"
import React, { useState, useEffect } from 'react';
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

const DashboardPage = () => {
  const [showBalance, setShowBalance] = useState(true);
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="px-4 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span>👤</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hello,</p>
              <p className="font-semibold text-gray-900 dark:text-white">OluofUCH</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">🔄</button>
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">⚙️</button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white mb-6">
          <div className="mb-4">
            <p className="text-sm opacity-80 mb-1">My Balance</p>
            <h1 className="text-3xl font-bold">$ 343,072.23</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
              **** **** 6848
            </div>
            <div className="bg-white/20 rounded-lg p-1">
              💳
            </div>
          </div>
        </div>

        {/* Currency List */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
          {currencies.map(currency => (
            <div key={currency.id} className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-4 min-w-[120px] shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white">{currency.name}</span>
                <span className={currency.change === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {currency.change === 'up' ? '↑' : '↓'}
                </span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">$ {currency.amount}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Transactions */}
      <main className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Transactions</h2>
          <button className="text-sm text-purple-600 dark:text-purple-400">See all</button>
        </div>

        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors">
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center gap-1">
            <RiHome5Line className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <BiTransfer className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <IoStatsChart className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Stats</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FaCog className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardPage;