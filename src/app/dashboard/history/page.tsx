"use client"
import React, { useState, useEffect } from 'react';

const DashboardPage = () => {

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
          title: 'Spotify',
          date: '21st May 2023, 9:51pm',
          amount: -2.2,
          icon: '🎵'
        },
        {
          id: 6,
          title: 'Spotify',
          date: '21st May 2023, 9:51pm',
          amount: -2.2,
          icon: '🎵'
        },
        {
          id: 7,
          title: 'Spotify',
          date: '21st May 2023, 9:51pm',
          amount: -2.2,
          icon: '🎵'
        },
        {
          id: 8,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 9,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 10,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 11,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 12,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 13,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 14,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
        {
          id: 15,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        },
      ]; 
return (
<div className={`min-h-screen w-full flex justify-center ${isDark ? 'bg-[#1F1F1F]' : 'bg-gray-100'}`}>
{/* Mobile container with fixed max width */}
<div className={`w-full max-w-sm min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#1F1F1F]' : 'bg-white'} shadow-xl`}>
     <header className="px-4 pt-4 pb-2 flex items-center justify-between">
     <button className="p-2">
     </button>
              <h1 className={`text-xl font-semibold ${isDark ? 'dark text-white' : 'text-gray-900'}`}>History</h1>
              <button className="p-2">
              </button>
            </header>
 {/* Transactions */}
 <main className="px-2 mt-2">
        
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
    </div>
);
}

export default DashboardPage;