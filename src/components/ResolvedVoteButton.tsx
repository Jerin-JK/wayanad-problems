'use client';

import { useState, useEffect } from 'react';

interface ResolvedVoteButtonProps {
  problemId: string;
  initialResolvedVotes: number;
  compact?: boolean;
}

export default function ResolvedVoteButton({
  problemId,
  initialResolvedVotes,
  compact = false,
}: ResolvedVoteButtonProps) {
  const [count, setCount] = useState(initialResolvedVotes ?? 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem(`resolved_${problemId}`);
    if (voted === 'true') setHasVoted(true);
  }, [problemId]);

  const handleToggle = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);
    setIsAnimating(true);

    const nextVoted = !hasVoted;
    const method = nextVoted ? 'POST' : 'DELETE';

    // Optimistic update
    setHasVoted(nextVoted);
    setCount((prev) => nextVoted ? prev + 1 : Math.max(0, prev - 1));
    if (nextVoted) {
      localStorage.setItem(`resolved_${problemId}`, 'true');
    } else {
      localStorage.removeItem(`resolved_${problemId}`);
    }

    try {
      await fetch(`/api/problems/${problemId}/resolve-vote`, { method });
    } catch (error) {
      // Rollback on failure
      console.error('Failed to toggle resolved vote', error);
      setHasVoted(!nextVoted);
      setCount((prev) => nextVoted ? Math.max(0, prev - 1) : prev + 1);
      if (!nextVoted) {
        localStorage.setItem(`resolved_${problemId}`, 'true');
      } else {
        localStorage.removeItem(`resolved_${problemId}`);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        title={hasVoted ? 'Click to un-vote' : 'Mark as resolved'}
        className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${
          hasVoted
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
            : 'border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:border-emerald-500/40 hover:text-emerald-400'
        } ${isAnimating ? 'scale-110' : 'scale-100'} disabled:opacity-60`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {count}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all duration-300 ${
        hasVoted
          ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
          : 'border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-400'
      } ${isAnimating ? 'scale-105' : 'scale-100'} disabled:opacity-60`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {hasVoted ? 'Marked as Resolved (click to undo)' : 'Mark as Resolved'}
      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black ${
        hasVoted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-700 text-zinc-300'
      }`}>
        {count}
      </span>
    </button>
  );
}
