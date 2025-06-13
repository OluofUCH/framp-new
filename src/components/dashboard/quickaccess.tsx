"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Quick = () =>{

  const [isDark, setIsDark] = useState(false);

  const logoSrc7 = "/images/offramp.svg";
  const logoSrc8 = "/images/onramp.svg";
  const logoSrc9 = "/images/utility.svg";
  const logoSrc10 = "/images/more.svg";
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

    const quickAccessItems = [
        { id: 1, name: 'Onramp', icon: logoSrc8, color: '#E3E2F5',  href: '/onramp' },
        { id: 2, name: 'Utility', icon: logoSrc9, color: '#E3E2F5',  href: '/' },
        { id: 3, name: 'Offramp', icon: logoSrc7, color: '#E3E2F5',  href: '/offramp' },
        { id: 4, name: 'More', icon: logoSrc10, color: '#E3E2F5',  href: '/' }
      ];
      
return(

    <>
         <div className="mb-4">
                <h3 className={`font-semibold text-gray-900 text-{18px} mb-3 dark:text-white text-black`}>Quick Access</h3>
                <div className="grid grid-cols-4 gap-4">
                  {quickAccessItems.map(item => ( 
                      <div key={item.id} className="flex flex-col items-center">
                        <Link href={item.href} className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-md bg-[#E3E2F5] hover:bg-[#7A73C1] flex items-center justify-center mb-2`}>
                        <Image 
                          src={item.icon} 
                          alt="Framp" 
                          width={80} 
                          height={24}
                          className="h-6 w-auto"
                          />
                      </div>
                      <span className={`text-xs dark:text-white text-black font-semi-bold text-center`}>{item.name}</span>
                          </Link>
                    </div>
                  ))}
                </div>
              </div>
    </>
                    );
}
export default Quick;