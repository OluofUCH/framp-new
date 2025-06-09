import { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";
import { Suspense } from "react";
import { BackgroundElements } from '@/components/ui/BackgroundElements';
import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: "Sign Up | FRAMP",
  description: "Create a FRAMP account to start using our services and manage your finances on Solana.",
};

// Loading fallback for suspense
function LoadingForm() {
  return (
    <div className="bg-white/50 dark:bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl max-w-md w-full mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-32 bg-black/5 dark:bg-white/5 rounded"></div>
        </div>
        <div className="h-8 bg-black/5 dark:bg-white/5 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-2/3 mx-auto"></div>
        <div className="h-12 bg-black/5 dark:bg-white/5 rounded"></div>
        <div className="h-12 bg-black/5 dark:bg-white/5 rounded"></div>
        <div className="h-12 bg-black/5 dark:bg-white/5 rounded"></div>
        <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
   
              <SignupForm />
           
  );
} 