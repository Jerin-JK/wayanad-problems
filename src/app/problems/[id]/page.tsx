import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CommentSection from '@/components/CommentSection';
import UpvoteButton from '@/components/UpvoteButton';
import CategoryBadge from '@/components/CategoryBadge';
import StatusBadge from '@/components/StatusBadge';
import Image from 'next/image';

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const problem = await prisma.problem.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!problem) {
    notFound();
  }

  let images: string[] = [];
  try {
    if (problem.images) {
      images = JSON.parse(problem.images as string);
    }
  } catch (e) {
    console.error('Failed to parse images', e);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/problems"
          className="inline-flex items-center space-x-2 text-zinc-400 hover:text-emerald-400 transition-colors uppercase tracking-widest text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Problems</span>
        </Link>

        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={problem.category} />
            <StatusBadge status={problem.status} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
            {problem.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {problem.location}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(problem.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Reported by: <span className="text-zinc-200">{problem.reporterName || 'Anonymous'}</span>
            </div>
          </div>
        </header>

        {images.length > 0 && (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl">
              <Image src={images[0]} alt="Problem" fill className="object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800/50">
                    <Image src={img} alt={`Problem thumbnail ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl">
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {problem.description}
          </p>
          <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Do you support this issue?</span>
            <UpvoteButton problemId={problem.id} initialUpvotes={problem.upvotes} />
          </div>
        </div>

        <section className="pt-10 border-t border-zinc-800/50">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            Comments <span className="text-emerald-500">({problem.comments.length})</span>
          </h2>
          <CommentSection 
            problemId={problem.id} 
            initialComments={problem.comments.map(c => ({
              ...c,
              createdAt: c.createdAt.toISOString()
            }))} 
          />
        </section>
      </div>
    </div>
  );
}
