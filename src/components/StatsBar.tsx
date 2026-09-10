'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StatsBar() {
  const [stats, setStats] = useState<{ total: number; resolvedVotes: number } | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStats({ total: data.total, resolvedVotes: data.resolvedVotes });
      }
    } catch (e) {
      console.error('Failed to fetch stats', e);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll every 10 seconds so the number stays live
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'TOTAL PROBLEMS', value: stats?.total ?? '—', href: '/problems' },
  ];

  return (
    <div className="mt-24 grid grid-cols-1 gap-6 max-w-sm mx-auto w-full animate-fade-in-up animation-delay-300">
      {items.map((stat, i) => (
        <Link
          href={stat.href}
          key={i}
          className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">
            {stat.value}
          </span>
          <span className="text-xs font-bold tracking-wider text-zinc-500 mt-2 uppercase group-hover:text-zinc-300 transition-colors">
            {stat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
