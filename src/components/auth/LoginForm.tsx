'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDebug('Starting login...');

    try {
      // Call your custom API endpoint
      setDebug('Sending credentials to /api/login...');
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        setError(`Login failed: ${errorData.message}`);
        setDebug(`Login failed: ${errorData.message}`);
        setLoading(false);
        return;
      }

      const { access_token, refresh_token, role } = await loginRes.json();
      setDebug(`Received tokens. Role: ${role}`);

      // Save session via API
      setDebug('Saving session to server...');
      const sessionRes = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token, refresh_token }),
      });

      if (!sessionRes.ok) {
        const sessionError = await sessionRes.json();
        setDebug(`Session save failed: ${sessionError.error}`);
      } else {
        setDebug('Session saved successfully.');
      }

      // Redirect
      const redirectPath = role === 'admin' ? '/admin' : '/dashboard';
      setDebug(`Redirecting to ${redirectPath}...`);
      window.location.href = redirectPath;

    } catch (err: any) {
      setError(`Unexpected error: ${err.message}`);
      setDebug(`Error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/50 dark:bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <img src="/frampapplogo.webp" alt="FRAMP Logo" className="h-12 w-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-2">Sign In</h1>
        <p className="text-center text-black/60 dark:text-white/60 mb-6">
          Welcome back to Framp
        </p>

        {error && (
          <div className="mb-4 p-3 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center bg-white dark:bg-black/30 gap-2 border border-black/20 dark:border-white/20 px-3 py-1 rounded-md">
            <LogIn className='w-[18px] h-[21px]' />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent p-2 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 border-none outline-none"
            />
          </div>

          <div className="flex items-center bg-white dark:bg-black/30 gap-2 border border-black/20 dark:border-white/20 px-3 py-1 rounded-md">
            <LogIn className='w-[18px] h-[21px]' />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 bg-transparent p-2 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 border-none outline-none"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-[#7b77b9] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white font-medium flex items-center justify-center gap-2 rounded-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign in <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-black/60 dark:text-white/60 mt-4">
          Don't have an account? <Link href="/signup" className="text-[#7b77b9] hover:underline">Sign up</Link>
        </p>

        {debug && (
          <div className="mt-6 p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg overflow-auto max-h-48">
            <p className="text-xs text-black/70 dark:text-white/70 font-mono whitespace-pre-wrap">{debug}</p>
          </div>
        )}
      </div>
    </div>
  );
}
