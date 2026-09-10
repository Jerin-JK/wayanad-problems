import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [total, totalComments, aggregates] = await Promise.all([
      prisma.problem.count(),
      prisma.comment.count(),
      prisma.problem.aggregate({
        _sum: {
          resolvedVotes: true,
          upvotes: true,
        },
      }),
    ]);

    const resolvedVotes = aggregates._sum.resolvedVotes ?? 0;
    const totalUpvotes = aggregates._sum.upvotes ?? 0;

    return NextResponse.json({ total, resolvedVotes, totalUpvotes, totalComments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
