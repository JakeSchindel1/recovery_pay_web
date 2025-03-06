'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { AuthError } from '@supabase/supabase-js';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [validResetLink, setValidResetLink] = useState(false);

  useEffect(() => {
    // Check if the URL contains the necessary hash parameters for password reset
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setValidResetLink(true);
    } else {
      setMessage({
        type: 'error',
        text: 'Invalid or expired password reset link. Please request a new one.',
      });
    }
  }, []);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: 'success',
        text: 'Password updated successfully!',
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const authError = error as AuthError;
      setMessage({
        type: 'error',
        text: authError.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        {message && (
          <div
            className={`rounded-md ${
              message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            } p-4`}
          >
            <div className="flex">
              <div className="ml-3">
                <h3
                  className={`text-sm font-medium ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {message.type === 'success' ? 'Success' : 'Error'}
                </h3>
                <div
                  className={`mt-2 text-sm ${
                    message.type === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {validResetLink && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Return to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 