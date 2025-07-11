"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, User, Banknote, HelpCircle, InfoIcon, LogOut } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

export default function ProfileScreen () {
  const Menu = [
    {name:"Personal Information",
      icon:  <User className="w-8 h-8 text-black text-lg bg-gray-300 rounded-full p-2" />,
      link: "/dashboard/profile/personal"
    },
    {name:"Link Bank Account",
      icon:  <Banknote className="w-8 h-8 text-black text-lg bg-gray-300 rounded-full p-2" />,
      link: "/dashboard/profile/bankaccount"
    },
    {name:"Help and Support",
      icon:  <InfoIcon className="w-8 h-8 text-black text-lg bg-gray-300 rounded-full p-2" />,
      link: "/dashboard/profile/personal"
    },
    {name:"Card Settings",
      icon:  <User className="w-8 h-8 text-black text-lg bg-gray-300 rounded-full p-2" />,
      link: "/dashboard/profile/personal"
    },
    {name:"FAQ",
      icon:  <HelpCircle className="w-8 h-8 text-black text-lg bg-gray-300 rounded-full p-2" />,
      link: "/dashboard/profile/faq"
    },
  ]
    return(
    <div className="min-h-screen overflow-scroll mx-auto max-w-sm bg-white">
    

     <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
             <Link href="/dashboard" className="p-2 -ml-2">
               <ArrowLeft className="w-6 h-6 text-gray-600" />
             </Link>
             <h1 className="text-lg font-medium text-gray-900">Profile</h1>
             <div className="w-10" />
           </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="relative">
           <Image 
                              src="/images/profilepic.svg"
                              alt="Framp" 
                              width={80} 
                              height={24}
                              className="h-32 w-auto"
                            />
        </div>
        <h2 className="text-xl text-black font-semibold mt-4">Stephen Ned</h2>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-1">
        {Menu.map( ( (item,index) =>
        <Link key={index} 
        className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
        href={item.link}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span className="text-gray-900">{item.name}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-black" />
        </Link>
      ))}
        
       
          <Link 
          className="flex items-center justify-between py-4 pt-6 border-b border-gray-100 cursor-pointer"
          href="/dashboard/profile/personal"
        >
          <div className="flex items-center space-x-3">
            <LogOut className="w-8 h-8 text-red-600 text-lg bg-gray-300 rounded-full p-2" />
            <span className="text-red-600">Logout</span>
          </div>
          <ChevronRight className="w-5 h-5 text-red-600" />
        </Link>
      
      <div className="mt-[20rem]"></div>
      </div>

    </div>
    );
};