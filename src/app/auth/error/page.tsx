'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    description: 'There is a problem with the server configuration. Please contact the administrator.',
  },
  AccessDenied: {
    title: 'Access Denied',
    description: 'You do not have permission to sign in with this account.',
  },
  Verification: {
    title: 'Link Expired',
    description: 'This sign-in link has expired or has already been used. Please request a new one.',
  },
  OAuthSignin: {
    title: 'Sign-In Error',
    description: 'An error occurred while connecting to Google. Please try again.',
  },
  OAuthCallback: {
    title: 'Callback Error',
    description: 'There was a problem with the Google sign-in. Please try again.',
  },
  Default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred during sign-in. Please try again.',
  },
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error') || 'Default';
  const errorInfo = errorMessages[errorCode] || errorMessages.Default;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-red-500/10 border border-red-500/20" />
          <div className="absolute inset-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-10 backdrop-blur-xl shadow-2xl shadow-black/60">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1.5 text-red-400 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            Error {errorCode !== 'Default' ? `· ${errorCode}` : ''}
          </div>

          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-100 mb-3">
            {errorInfo.title}
          </h1>
          <p className="text-zinc-400 leading-relaxed mb-8">
            {errorInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signin"
              id="try-again-btn"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
