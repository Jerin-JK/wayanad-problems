'use server';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.email !== 'jerinkjaison23@gmail.com') {
    throw new Error('Unauthorized');
  }
}

export async function updateProblemStatus(id: string, status: string) {
  await checkAdmin();
  
  await prisma.problem.update({
    where: { id },
    data: { status }
  });
  
  revalidatePath('/admin');
  revalidatePath('/problems');
  revalidatePath(`/problems/${id}`);
}

export async function deleteProblem(id: string) {
  await checkAdmin();
  
  await prisma.problem.delete({
    where: { id }
  });
  
  revalidatePath('/admin');
  revalidatePath('/problems');
}
