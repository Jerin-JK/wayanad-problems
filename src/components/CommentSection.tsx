'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

type Comment = {
  id: string;
  content: string;
  authorName: string | null;
  createdAt: string;
};

export default function CommentSection({
  problemId,
  initialComments,
}: {
  problemId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/problems/${problemId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setContent('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="space-y-8">
      {status === 'loading' ? (
        <div className="h-32 bg-zinc-900/40 rounded-2xl animate-pulse"></div>
      ) : !session ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold tracking-tight text-zinc-100 uppercase">Join the Discussion</h3>
            <p className="text-zinc-400 text-sm">Sign in to add a comment and make your voice heard.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <button
              onClick={() => signIn('google')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-200 font-semibold text-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => signIn()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Link
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-100 uppercase">Add a Comment</h3>
          <div className="space-y-4">
            <textarea
              placeholder="Your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-5 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition-colors min-h-[100px] resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-zinc-500 italic">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-emerald-400">
                  {comment.authorName || 'Anonymous'}
                </span>
                <span className="text-xs text-zinc-500" suppressHydrationWarning>
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
