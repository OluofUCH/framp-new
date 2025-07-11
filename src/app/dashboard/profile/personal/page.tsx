 'use client';
 
 import { useState } from 'react';
 import { ChevronLeft, ChevronRight, Plus, ArrowLeft, User } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

 const PersonalInfoScreen = () => {
   const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
   });
   const handleUpdateInfo = () =>{
    event?.preventDefault();

   }

return(
    <div className="min-h-screen mx-auto max-w-sm bg-white">
     

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
       <Link href="/dashboard/profile"> <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-black"
        /></Link>
        <h1 className="text-lg text-black font-semibold">Personal Information</h1>
        <div className="w-6"></div>
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="relative">
                    <Image 
                                       src="/images/profilepic.svg"
                                       alt="Framp" 
                                       width={80} 
                                       height={24}
                                       className="h-32 w-auto"
                                     />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#443f91] rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="px-4 space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-2 block">First name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-2 block">Last name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
              className="w-full px-3 py-3 border border-gray-300 bg-white rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
            className="w-full px-3 py-3 border border-gray-300 bg-white rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Update Button */}
      <div className="px-4 mt-8">
        <button
          onClick={handleUpdateInfo}
          className="w-full bg-[#443f91] text-white py-4 rounded-lg text-center font-medium hover:bg-[#625cb9] transition-colors"
        >
          Update Information
        </button>
      </div>
    </div>
    );
 };
  export default PersonalInfoScreen;