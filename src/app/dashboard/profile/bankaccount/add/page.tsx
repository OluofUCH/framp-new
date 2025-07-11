"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, AlertCircle } from 'lucide-react';
import Link from "next/link"

export default function AddAccountUI() {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 for first screen, 2 for second screen

  const banks = [
    'Access Bank',
    'GTBank',
    'First Bank',
    'Zenith Bank',
    'UBA',
    'Fidelity Bank'
  ];

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    setIsDropdownOpen(false);
    if (bank === 'Access Bank' && accountNumber === '12345678') {
      setStep(2);
      setAccountName('Evangelist Udueze Robin');
    }
  };



  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
   

      {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
           <Link href="/dashboard/profile/bankaccount"> <ChevronLeft 
              className="w-6 h-6 cursor-pointer text-black"
            /></Link>
            <h1 className="text-lg text-black font-semibold">Add account</h1>
            <div className="w-6"></div>
          </div>

      {/* Content */}
      <div className="px-4 py-6">
        <p className="text-sm text-gray-600 mb-4">
          Add a valid Account Details for Completing Exchange
        </p>

        {/* Warning */}
        <div className="flex items-center mb-6">
          <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-xs text-gray-500">Add only personal account</span>
        </div>

        {/* Select Bank */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <span className={selectedBank ? 'text-gray-800' : 'text-gray-400'}>
                {selectedBank || 'Select Bank'}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {banks.map((bank) => (
                  <button
                    key={bank}
                    onClick={() => handleBankSelect(bank)}
                    className="w-full px-4 py-3 text-left text-black hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account Number */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <div className="relative">
            <input
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Account Number"
              className="w-full px-4 py-3 bg-white border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          
          </div>
           
 {step === 2 && (
                <div className="flex justify-between">
                    <div></div>
              <div className="text-sm text-gray-600">
               {accountName}
              </div>
              </div>
            )}
        </div>
        {/* Add Bank Account Button */}
        <button
          className={`w-full py-4 rounded-lg text-white font-medium transition-colors ${
            selectedBank && accountNumber
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-purple-300 cursor-not-allowed'
          }`}
          disabled={!selectedBank || !accountNumber}
        >
          Add Bank Account
        </button>
      </div>
    </div>
  );
}