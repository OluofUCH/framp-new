"use client";

import { useState } from "react";
import { ArrowLeft, Lock, Mail, Download, Eye, EyeOff } from "lucide-react";
import Image from 'next/image';

export default function ForgotPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const logoSrc = "/images/lock1.svg";
  const logoSrc2 = "/images/lock2.svg";
  const logoSrc3 = "/images/lock3.svg";

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormError("");
    }  
    if (currentStep == 1) {
      window.location.href="/login"
    }
  };

  const handleSendCode = async () => {
    setFormError("");
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(2);
    } catch (err: any) {
      setFormError("Failed to send verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmail = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(3);
    } catch (err: any) {
      setFormError("Failed to verify email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNewPassword = async () => {
    setFormError("");
    
    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(4);
    } catch (err: any) {
      setFormError("Failed to create new password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    // Reset the flow and navigate back to login
    setCurrentStep(1);
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setFormError("");
    window.location.href="/login"
    console.log("Navigate back to login");
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Forgot Password";
      case 2: return "Verify Your Email";
      case 3: return "Create New Password";
      case 4: return "Create New Password";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return  <Image 
      src={logoSrc} 
      alt="Framp" 
      width={18} 
      height={18}
      className="h-8 w-auto"
    />;
      case 2: return <Image 
      src={logoSrc2} 
      alt="Framp" 
      width={18} 
      height={18}
      className="h-8 w-auto"
    />;
      case 3: return <Image 
      src={logoSrc3} 
      alt="Framp" 
      width={18} 
      height={18}
      className="h-8 w-auto"
    />;
      case 4: return null;
      default: return null;
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Please Enter Your Email Address to Receive a Verification Link";
      case 2: return "A Link Has Been Sent to Your Mail. Kindly go to Your Email and Confirm your Account";
      case 3: return "Input a New Password, it Must be Different From the Old Password";
      case 4: return "Your New Password has been set. Kindly go Back to Login to Access Your Account";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium text-gray-900">{getStepTitle()}</h1>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-sm mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
            {currentStep === 4 ? (
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            ) : (
              getStepIcon()
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {getStepDescription()}
          </p>

          {formError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-left">
              {formError}
            </div>
          )}

          {/* Step 1: Email Input */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Example123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Step 2: Verification Message */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                Resend Verification Link
              </button>
            </div>
          )}

          {/* Step 3: New Password Form */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <div className="max-w-sm mx-auto">
          {currentStep === 1 && (
            <button
              onClick={handleSendCode}
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Code"
              )}
            </button>
          )}

          {currentStep === 2 && (
            <button
              onClick={handleVerifyEmail}
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          )}

          {currentStep === 3 && (
            <button
              onClick={handleCreateNewPassword}
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create New Password"
              )}
            </button>
          )}

          {currentStep === 4 && (
            <button
              onClick={handleBackToLogin}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}