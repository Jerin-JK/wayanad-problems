'use client';

import { useState, useRef, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (status === 'loading') {
    return <div className="h-9 w-9 bg-zinc-800 animate-pulse rounded-full" />;
  }

  if (session) {
    const user = session.user;
    const initials = user?.name
      ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
      : user?.email?.[0].toUpperCase() ?? '?';

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          id="user-avatar-btn"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-zinc-700/80 bg-zinc-900/70 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 group"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 ring-1 ring-emerald-500/30">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User avatar'}
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-white">{initials}</span>
            )}
          </div>
          {/* Name */}
          <span className="text-sm font-medium text-zinc-300 hidden sm:block max-w-[120px] truncate">
            {user?.name || user?.email?.split('@')[0] || 'User'}
          </span>
          {/* Chevron */}
          <svg
            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            {/* User info */}
            <div className="px-4 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 ring-2 ring-emerald-500/20">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">{initials}</span>
                  )}
                </div>
                <div className="min-w-0">
                  {user?.name && (
                    <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
                  )}
                  <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            {/* Admin Dashboard link (only for admin) */}
            {user?.email === 'jerinkjaison23@gmail.com' && (
              <div className="p-2 border-b border-zinc-800">
                <Link
                  href="/admin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Dashboard
                </Link>
              </div>
            )}
            {/* Sign out */}
            <div className="p-2">
              <button
                id="signout-btn"
                onClick={() => { setIsDropdownOpen(false); signOut(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      id="login-btn"
      onClick={() => signIn()}
      className="text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-zinc-950 transition-all shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
    >
      Login
    </button>
  );
}
