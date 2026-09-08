'use client';

import { useState, useEffect } from 'react';

interface UpvoteButtonProps {
  problemId: string;
  initialCount?: number;
  initialUpvotes?: number;
}

export default function UpvoteButton({ problemId, initialCount, initialUpvotes }: UpvoteButtonProps) {
  const [count, setCount] = useState(initialCount ?? initialUpvotes ?? 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem(`upvoted_${problemId}`);
    if (voted === 'true') {
      setHasVoted(true);
    }
  }, [problemId]);

  const handleUpvote = async () => {
    if (hasVoted) return;

    setIsAnimating(true);
    setHasVoted(true);
    setCount(prev => prev + 1);
    localStorage.setItem(`upvoted_${problemId}`, 'true');

    try {
      await fetch(`/api/problems/${problemId}/upvote`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to upvote', error);
      setHasVoted(false);
      setCount(prev => prev - 1);
      localStorage.removeItem(`upvoted_${problemId}`);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasVoted}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 font-bold transition-all duration-300 ${
        hasVoted
          ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
          : 'border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400'
      } ${isAnimating ? 'scale-110' : 'scale-100'}`}
    >
      <svg 
        className={`w-5 h-5 transition-transform ${hasVoted ? 'text-emerald-400' : ''}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      {count}
    </button>
  );
}
