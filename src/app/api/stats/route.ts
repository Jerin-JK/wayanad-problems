import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [total, totalComments, resolvedResult] = await Promise.all([
      prisma.problem.count(),
      prisma.comment.count(),
      prisma.$queryRaw<{ total: number }[]>`SELECT COALESCE(SUM(resolvedVotes), 0) as total FROM Problem`,
    ]);

    const resolvedVotes = Number(resolvedResult[0]?.total ?? 0);

    return NextResponse.json({ total, resolvedVotes, totalComments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
