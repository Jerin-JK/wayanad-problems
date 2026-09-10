import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminProblemList from "./AdminProblemList";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.email !== 'jerinkjaison23@gmail.com') {
    redirect('/');
  }

  const problems = await prisma.problem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6 md:px-12 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Admin Dashboard
            </h1>
            <p className="text-zinc-400 mt-2 font-medium">
              Manage reported issues across Wayanad.
            </p>
          </div>
          <Link
            href="/problems"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold transition-all"
          >
            View Public Platform
          </Link>
        </header>

        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <AdminProblemList initialProblems={problems.map(p => ({
            ...p,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          }))} />
        </div>
      </div>
    </div>
  );
}
