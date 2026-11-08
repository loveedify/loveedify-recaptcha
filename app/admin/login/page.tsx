'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';
import { Lock, Mail, Eye, EyeOff, Heart } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [error, setError] = useState('');

  // Check existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Session Error:', error.message);
        }

        if (session) {
          router.replace('/admin');
          return;
        }

        setCheckingSession(false);
      } catch (err) {
        console.error('Unexpected session error:', err);
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router]);

  // Login handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const check = await submitProtectedForm('admin_login');

      if (!check.ok) {
        setError(check.message);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      window.location.href = '/admin';
    } catch (err) {
      console.error(err);

      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // Loading screen
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-forest-500 rounded-2xl flex items-center justify-center shadow-lg">
              <img
                src="https://static.wixstatic.com/shapes/c73eb8_4c3d83c3e6104f6485e207603ce3b1c1.svg"
                alt="Love Edify logo"
                className="w-10 h-10"
              />
            </div>

            <div>
              <p className="font-poppins font-700 text-forest-500 text-xl leading-tight">
                Love Edify
              </p>

              <p className="font-inter text-muted-gray text-sm">
                Admin Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-soft border border-cream-100 p-8">
          <div className="mb-7">
            <h1 className="font-poppins font-700 text-2xl text-forest-500 mb-1">
              Welcome Back
            </h1>

            <p className="font-inter text-muted-gray text-sm">
              Sign in to manage your center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray pointer-events-none" />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@loveedify.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray pointer-events-none" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-gray hover:text-charcoal transition-colors"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
                <p className="text-sm font-inter text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6">
            <RecaptchaNotice />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs font-inter text-muted-gray mt-6 flex items-center justify-center gap-1">
          Made with{' '}
          <Heart className="w-3 h-3 text-golden-500 fill-golden-500" /> by
          Love Edify
        </p>
      </div>
    </div>
  );
}