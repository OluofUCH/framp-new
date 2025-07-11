 'use client';
 
 import { useState } from 'react';
 import { ChevronLeft, ChevronRight, Plus, ArrowLeft, User } from 'lucide-react';
import Link from "next/link"

 const FAQ = () => {
 
const questions = [
    {
        head:" Ques: How do I off-ramp with Framp?",
        lead:"Ans: Connect your Solana wallet, choose your bank and off-ramp stablecoins in seconds."
    },
    {
        head:"Ques: Is my money safe?",
        lead:"Ans: Framp partners with regulated liquidity providers and uses secure smart contracts to manage Our Liquidity Pool."
    },
    {
        head:"Ques: What savings options do you offer?",
        lead:"Ans: You can enable auto-saving from each transaction or balance—and soon, earn yield on stablecoins."
    },
    {
        head:"Ques: What countries do you support?",
        lead:"Ans: We’re launching in Nigeria first, with more African markets coming soon."
    },
    {
        head:"Ques: Do I need a bank account?",
        lead:"Ans: Yes, you need bank accounts to get your converted Crypto to Fiat, and convert your Fiat to Crypto. "
    },
    {
        head:"Ques: Will Framp be launching it Token?",
        lead:" Ans: No, there'll be no token for Framp as our aim is to provide financial services to our customers only."
    },
]
   

return(
    <div className="min-h-screen mx-auto max-w-sm bg-white">
     

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
       <Link href="/dashboard/profile"> <ChevronLeft 
          className="w-6 h-6 cursor-pointer text-black"
        /></Link>
        <h1 className="text-lg text-black font-semibold">FAQ</h1>
        <div className="w-6"></div>
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-4 px-4 py-6">
        {questions.map(((item, index)=>
        <div key={index}>

        <p className="text-black text-md font-bold">
            {item.head}
        </p>
         <p className="text-black text-sm font-normal">
            {item.lead}
        </p>
        </div>
        ))}
      
        </div>
      </div>
    );
 };
  export default FAQ;