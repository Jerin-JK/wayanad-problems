'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginButton from './LoginButton';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Problems', href: '/problems' },
    { name: 'Submit', href: '/submit' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl tracking-tighter uppercase bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Wayanad Problems
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-1 py-1 flex space-x-1 shadow-lg shadow-white/5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'text-zinc-700 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LoginButton />
            <Link
              href="/submit"
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95"
            >
              Report Problem
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-white/5 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-semibold ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-3">
              <LoginButton />
              <Link
                href="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wide"
              >
                Report Problem
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
