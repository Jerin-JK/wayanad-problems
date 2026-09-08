import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const problem = await prisma.problem.update({
      where: { id },
      data: { resolvedVotes: { increment: 1 } },
    });
    return NextResponse.json({ resolvedVotes: problem.resolvedVotes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const current = await prisma.problem.findUnique({ where: { id }, select: { resolvedVotes: true } });
    const newCount = Math.max(0, (current?.resolvedVotes ?? 1) - 1);
    const problem = await prisma.problem.update({
      where: { id },
      data: { resolvedVotes: newCount },
    });
    return NextResponse.json({ resolvedVotes: problem.resolvedVotes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
