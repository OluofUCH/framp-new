"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr'

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [debug, setDebug] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Create supabase browser client directly for better control
  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    setDebug("Starting signup process...");

    // Minimal validation
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simple password check
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }

    try {
      setDebug("Starting signup process for: " + email);
      
      // Direct API call to signup endpoint for better control
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      if (response.ok) {
       window.location.href="/login"
      }
      
      setDebug("Signup successful, now signing in");
      
      // Sign in the user immediately after signup
      // const { error: signInError } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (signInError) {
      //   console.error("Error signing in after registration:", signInError);
      //   setDebug("Error signing in: " + signInError.message);
      //   throw new Error('Account created but login failed. Please go to the login page.');
      // }
      
      // setDebug("Login successful, redirecting to dashboard");
      
      // // Use window.location for a full page refresh to ensure state is reset
     
    } catch (err: any) {
      console.error("Signup error:", err);
      setFormError(err.message || "Failed to create account. Please try again.");
      setDebug("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
return(
  <div className="min-h-screen bg-white flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
    <button className="p-2 -ml-2">
      <ArrowLeft className="w-6 h-6 text-gray-600" />
    </button>
    <div className="flex-1" />
  </div>

  {/* Main Content */}
  <div className="flex-1 px-6 py-8">
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign up</h1>
      <p className="text-gray-600 text-sm mb-8">
        Quickly create an account
      </p>
      
      {formError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Example123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
    <div className="max-w-sm mx-auto space-y-4">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          "Verify your Email"
        )}
      </button>
      
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Sign in
        </a>
      </p>
    </div>
  </div>
</div>
);
}  