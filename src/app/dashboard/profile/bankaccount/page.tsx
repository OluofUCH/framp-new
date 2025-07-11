 'use client';
 
 import { useState } from 'react';
 import { ChevronLeft, ChevronRight, Plus, ArrowLeft, User, UserCheck2Icon, Trash2 } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

 const Bank = () => {
const [acc, setAcc]=useState(false); 

if(acc){
    return(
         <div className="min-h-screen mx-auto max-w-sm bg-white">
     

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
       <Link href="/dashboard/profile"> <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-black"
        /></Link>
        <h1 className="text-lg text-black font-semibold">Bank Account</h1>
        <div className="w-6"></div>
      </div>

        <div className='p-4'>

        <div className="bg-[#eeeeee] flex rounded-lg justify-between items-center p-4">
        <div className='flex flex-col gap-2'>
        <p className="text-black text-md font-bold">
            Evangelist Udeze Robin

        </p>
        <span className="flex justify-between">

         <p className="text-black text-sm font-normal">
          0123456789
        </p>
        <p className="text-black text-sm font-normal">
          |
        </p>
         <p className="text-black text-sm font-normal">
        Access Bank
        </p>
        </span>
        </div>
         <Trash2 
          className="w-8 h-8 cursor-pointer text-black"
        />
      </div>
        </div> 
        </div>
    )
}

return(
    <div className="min-h-screen mx-auto max-w-sm bg-white">
     

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
       <Link href="/dashboard/profile"> <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-black"
        /></Link>
        <h1 className="text-lg text-black font-semibold">Bank Account</h1>
        <div className="w-6"></div>
      </div>

  
        <div className="min-h-[75dvh] flex flex-col justify-center items-center">

         <div className="flex-1 flex gap-4 flex-col items-center justify-center px-8 text-center">
           
                    {/* Success Icon */}
                      <div className="relative">
                               <Image 
                                                  src="/images/rev.svg"
                                                  alt="Framp" 
                                                  width={80} 
                                                  height={24}
                                                  className="h-48 w-auto"
                                                />
                            </div>
        
                    {/* Title */}
                    <div className="flex flex-col gap-2">

                    <h1 className="text-2xl font-bold  text-black">Nothing To See Here</h1>
        
                    {/* Description */}
                    <p className={`text-center leading-relaxed  text-gray-600`}>
                      You are yet to link your bank account
                    </p>
                    </div>

                    <Link href="/dashboard/profile/bankaccount/add" className='flex gap-2 items-center justify-center'>
                         <Plus className="w-4 h-4 text-[#9747ff] rounded-full border border-[#9747ff]" />
                        <p className={` text-[#9747ff] text-sm leading-relaxed`}>
                      Add new account
                    </p>
                    </Link>
        </div>
      </div>
        </div>
    );
 };
  export default Bank;