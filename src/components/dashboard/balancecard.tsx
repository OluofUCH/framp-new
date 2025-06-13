"use client"
import React, { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaEyeSlash
} from 'react-icons/fa';
import Image from 'next/image';

const Balance =  ()  => {
    
  const logoSrc6 = "/images/sol.svg";
  const logo11 = "/images/fr.svg";
      const [showBalance, setShowBalance] = useState(true);

    return(
    <div className="bg-gradient-to-tr flex justify-between from-[#7A73C1] via-[#443F91] to-[#161737] rounded-2xl p-4 text-white mb-6">
            <div className="w-full">
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
              <div className="mb-4 mt-2">
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
              className="h-[130px] fixed left-1/2 ml-10  w-auto"
            />
          </div>
    );
}
export default Balance;