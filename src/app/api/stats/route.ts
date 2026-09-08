import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const [total, reported, inProgress, resolved, totalComments] = await Promise.all([
      prisma.problem.count(),
      prisma.problem.count({ where: { status: 'reported' } }),
      prisma.problem.count({ where: { status: 'in_progress' } }),
      prisma.problem.count({ where: { status: 'resolved' } }),
      prisma.comment.count(),
    ]);

    return NextResponse.json({
      total,
      reported,
      inProgress,
      resolved,
      totalComments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
