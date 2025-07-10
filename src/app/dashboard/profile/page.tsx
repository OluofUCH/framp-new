"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, User } from 'lucide-react';
import Link from "next/link"

export default function ProfileScreen () {
    return(
    <div className="min-h-screen mx-auto max-w-sm bg-white">
    

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
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <div className="w-full h-8 bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-200"></div>
              <div className="w-full h-16 bg-blue-600 flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">Stephen Ned</h2>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-1">
        <Link 
          className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
          href="/dashboard/profile/personal"
        >
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Personal Information</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
        
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
              <div className="w-3 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-gray-900">Link Bank Account</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-600">?</span>
            </div>
            <span className="text-gray-900">Help and Support</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-gray-900">Card Settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-600 font-bold">!</span>
            </div>
            <span className="text-gray-900">FAQ</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-red-500 text-lg">↪</span>
            </div>
            <span className="text-red-500">Logout</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

    </div>
    );
};