'use client';

import { useState } from 'react';

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
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/problems/${problemId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName: name || null, content }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setName('');
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
      <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold tracking-tight text-zinc-100 uppercase">Add a Comment</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-5 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition-colors"
          />
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
                <span className="text-xs text-zinc-500">
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
