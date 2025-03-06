'use client';

import Link from 'next/link';

export default function SignupConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve sent a confirmation link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive an email? Check your spam folder or{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              try signing up again
            </Link>
            .
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
} 