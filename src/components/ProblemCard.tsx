'use client';

import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import ResolvedVoteButton from './ResolvedVoteButton';

export interface ProblemCardProps {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  status?: string;
  upvotes?: number;
  resolvedVotes?: number;
  images?: string | null;
  createdAt?: string | Date;
  commentCount?: number;
  comments?: any[];
  _count?: { comments: number };
  problem?: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    status: string;
    upvotes: number;
    resolvedVotes: number;
    images: string | null;
    createdAt: string | Date;
    comments?: any[];
    commentCount?: number;
    _count?: { comments: number };
  };
}

function timeAgo(dateInput: string | Date) {
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(days / 365);
  return `${years} years ago`;
}

export default function ProblemCard(props: ProblemCardProps) {
  const p = props.problem || props;
  const id = p.id || '';
  const title = p.title || '';
  const description = p.description || '';
  const category = p.category || 'Other';
  const location = p.location || '';
  const status = p.status || 'reported';
  const upvotes = p.upvotes || 0;
  const resolvedVotes = (p as any).resolvedVotes || 0;
  const images = p.images || null;
  const createdAt = p.createdAt || new Date();
  const commentCount = p.commentCount ?? (p.comments ? p.comments.length : (p._count?.comments ?? 0));

  let firstImage = null;
  try {
    if (images) {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        firstImage = parsed[0];
      }
    }
  } catch (e) {
    // Ignore parse errors
  }

  return (
    <Link href={`/problems/${id}`} className="block group h-full">
      <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 group-hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-emerald-900/10 h-full flex flex-col">
        
        {firstImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <img src={firstImage} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
          </div>
        )}

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <CategoryBadge category={category} />
          </div>

          <h3 className="text-lg font-bold text-zinc-100 mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500 font-medium">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center">
                <svg className="w-3.5 h-3.5 mr-1 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate max-w-[120px]">{location}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-3.5 h-3.5 mr-1 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {timeAgo(createdAt)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {commentCount > 0 && (
                <div className="flex items-center text-zinc-400 group-hover:text-cyan-400 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {commentCount}
                </div>
              )}
              <div className="flex items-center text-zinc-400 group-hover:text-emerald-400 transition-colors bg-zinc-800/50 px-2 py-1 rounded-md">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                {upvotes}
              </div>
              <ResolvedVoteButton problemId={id} initialResolvedVotes={resolvedVotes} compact />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
