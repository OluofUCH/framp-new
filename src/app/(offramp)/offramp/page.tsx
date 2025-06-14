'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useWalletContext } from '@/contexts/WalletContext';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertCircle, 
  ExternalLink, 
  DollarSign,
  CheckCircle2,
  ArrowRightCircle,
  Coins,
  Share,
  ArrowDown,
  Check
} from 'lucide-react';
import { Spinner } from 'reactstrap';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

// Exchange rates (for demonstration purposes)
const EXCHANGE_RATES = {
  USD: 1566.23,
  EUR: 1761.50,
  GBP: 2151.88,
};

// Bank options
const BANK_OPTIONS = [
  { id: 'bank_transfer', name: 'Bank Transfer', fee: 0.5 },
  { id: 'paypal', name: 'PayPal', fee: 1.0 },
  { id: 'wise', name: 'Wise', fee: 0.75 },
];

export default function OfframpPage() {
  const logo12 = "/images/coin.svg";
  const logo13 = "/images/coin2.svg";
  const logo133 = "/images/coin3.svg";
  const logo15 = "/images/NGN.svg";

  const { publicKey, connected } = useWallet();
  const { balance, refreshBalance } = useWalletContext();
  const { user } = useAuth();
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [receiving, setReceiving] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
  }, []);
  // Refresh balance when the component loads
  useEffect(() => {
    if (connected && publicKey) {
      refreshBalance();
    }
  }, [connected, publicKey, refreshBalance]);

  // Calculate receiving amount when input changes
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const solAmount = parseFloat(amount);
      const selectedPaymentMethod = BANK_OPTIONS.find(option => option.id === paymentMethod);
      const feePercentage = selectedPaymentMethod ? selectedPaymentMethod.fee : 0;
      
      // Calculate fiat amount after fees
      const exchangeRate = EXCHANGE_RATES[currency];
      const rawAmount = solAmount * exchangeRate;
      const feeAmount = (rawAmount * feePercentage) / 100;
      const finalAmount = rawAmount - feeAmount;
      
      setReceiving(finalAmount);
    } else {
      setReceiving(0);
    }
  }, [amount, currency, paymentMethod]);

  // Form validation
  const validateForm = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    
    if (parseFloat(amount) > (balance || 0)) {
      setError('Insufficient balance');
      return false;
    }

    if (step === 2) {
      if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.routingNumber || !bankDetails.bankName) {
        setError('Please fill in all bank details');
        return false;
      }
    }

    setError(null);
    return true;
  };

  // Handle next step
  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would integrate with a payment processor API here
      // For demo purposes, we'll simulate a successful transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random transaction ID
      const mockTransactionId = 'TX-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTransactionId(mockTransactionId);
      
      // Move to confirmation step
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Transaction failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle proceed (mobile UI)
  const handleProceed = () => {
    if (!amount || !validateForm()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(4);
      setIsSubmitting(false);
      const mockTransactionId = 'TX-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTransactionId(mockTransactionId);
    }, 2000);
  };

  // Handle done action
  const handleDone = () => {
    setStep(1);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';

  const cardClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-[#C2C0EB] border-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Mobile Off-Ramp Interface */}
      {step === 1 && (
        <div className="max-w-sm mx-auto min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 pt-6">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            
            <span className="text-lg font-medium">Off-Ramp</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                </div>
            </div>
          </div>

      

          {connected ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <p className="text-center mb-6 text-gray-400">Connect your wallet to proceed with the offramp</p>
              <div className="wallet-adapter-dropdown">
                <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !h-auto !py-4 !px-6" />
              </div>
            </div>
          ) : (
            <>
              {/* Main Card */}
              <div className="flex-1 px-4">
                <div className={`${cardClasses} bg-[#C2C0EB]  rounded-3xl p-6 border shadow-sm`}>
                  {/* Off-Ramp Label */}
                  <div className="mb-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[purple-100] dark:bg-purple-900/30 rounded-full">
                      <span className={`${isDarkMode ? 'text-white' : 'text-black'} text-sm font-medium`}>Off-Ramp</span>
                    </div>
                  </div>

                   {/* You Receive Section */}
                   <div className={`mb-0 ${isDarkMode ? 'bg-gray-900' : 'bg-[#E3E2F5]'} rounded-lg px-4 py-2 mb-[-15px]`}>
                    <div className={`text-sm  ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}  mb-2`}>You Pay</div>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={balance || 0}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-3xl font-bold bg-transparent border-none outline-none w-full"
                        placeholder="0.00"
                      />
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR' | 'GBP')}
                          className="bg-transparent border-none outline-none text-sm font-medium"
                        >
                          <option className="text-black flex" value="USD">
                              {/* <Image 
                                                        src={logo133} 
                                                        alt="Framp" 
                                                        width={14} 
                                                        height={14}
                                                        className="h-[20px] w-auto"
                                                      />  */}
                                                      USDT
                                                      </option>
                          <option className="text-black" value="EUR" >
                           {/* <Image 
                                                        src={logo12} 
                                                        alt="Framp" 
                                                        width={10} 
                                                        height={10}
                                                        className="h-[20px] w-auto"
                                                      />  */}
                                                      USDC</option>
                          <option className="text-black" value="GBP"  >
                          {/* <Image 
                                                        src={logo13} 
                                                        alt="Framp" 
                                                        width={10} 
                                                        height={10}
                                                        className="h-[20px] w-auto"
                                                      />  */}
                                                    USD*</option>
                        </select>
                      </div>
                    </div>
                  </div>

               

                  {/* Arrow Down */}
                  <div className="flex justify-center mb-[-15px]">
                    <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} border-[#C2C0EB] border-[4px] rounded-full flex items-center justify-center`}>
                      <ArrowDown className="w-5 h-5" />
                    </div>
                  </div>

                   {/* You Pay Section */}
                   <div className={`mb-2 ${isDarkMode ? 'bg-gray-900' : 'bg-[#E3E2F5]'} rounded-lg px-4 py-2`}>
                    <div className={`text-sm  ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}  mb-2`}>You Recieve</div>
                    <div className="flex items-center justify-between text-3xl font-bold">
                     
                    {receiving > 0 ? receiving.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                      <div className="flex items-center gap-0">
                        <div className="w-6 h-6  flex items-center justify-center">
                           <Image 
                                                        src={logo15} 
                                                        alt="Framp" 
                                                        width={14} 
                                                        height={14}
                                                        className="h-[10px] w-auto"
                                                      /> 
                        </div>
                        <span className="text-sm font-medium">NGN</span>
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="px-4 mb-4">
                  <div className="p-3 bg-red-900/40 border border-red-800 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              <div className="p-4 mb-[20px]">
                <button
                  onClick={handleProceed}
                  disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
                  className="w-full bg-purple-600 mb-[45px] hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-2xl font-semibold text-lg transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Success Page */}
      {step === 4 && (
        <div className="max-w-sm mx-auto min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 pt-12">
            <button 
              onClick={() => setStep(1)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>

          {/* Success Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8">
              <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4">Transaction Processing!</h1>

            {/* Description */}
            <p className={`text-center leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your transaction request has been received and is being processed. You should receive your funds successfully in a few seconds.
            </p>

            {/* Transaction Details */}
            <div className={`${cardClasses} rounded-2xl p-4 w-full max-w-xs mb-8 border`}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Transaction ID</span>
                  <span className="font-mono text-xs">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Amount</span>
                  <span>{amount} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Receiving</span>
                  <span>{receiving.toFixed(2)} {currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className="text-green-500">Processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Done Button */}
          <div className="p-4 pb-8">
            <button
              onClick={handleDone}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-semibold text-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}