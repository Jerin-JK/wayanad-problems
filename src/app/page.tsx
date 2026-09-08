import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProblemCard from "@/components/ProblemCard";

export default async function Home() {
  let recentProblems: any[] = [];
  try {
    recentProblems = await prisma.problem.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { comments: true },
    });
  } catch (error) {
    console.error("Error fetching recent problems:", error);
  }

  // Placeholder stats data
  const stats = {
    total: 124,
    inProgress: 45,
    resolved: 78
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-grid-pattern z-0" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] z-0 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] z-0 animate-pulse-glow animation-delay-200" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase animate-fade-in-up">
            <span className="block text-zinc-100">VOICE OF</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 mt-2">
              WAYANAD
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium animate-fade-in-up animation-delay-100">
            A community platform to report, discuss, and track problems across Wayanad district. Together, we make our voices heard.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-200">
            <Link 
              href="/submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold tracking-wide hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
            >
              REPORT A PROBLEM
            </Link>
            <Link 
              href="/problems"
              className="px-8 py-4 rounded-full border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm text-zinc-300 font-bold tracking-wide hover:bg-zinc-800 hover:text-zinc-100 transition-all"
            >
              BROWSE PROBLEMS
            </Link>
          </div>
          
          {/* Stats Row */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up animation-delay-300">
            {[
              { label: "TOTAL PROBLEMS", value: stats.total },
              { label: "IN PROGRESS", value: stats.inProgress },
              { label: "RESOLVED", value: stats.resolved },
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                  {stat.value}
                </span>
                <span className="text-xs font-bold tracking-wider text-zinc-500 mt-2 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Problems Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            <span className="text-zinc-100">RECENT </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PROBLEMS</span>
          </h2>
        </div>
        
        {recentProblems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link 
                href="/problems"
                className="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group"
              >
                View All Problems 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl backdrop-blur-sm">
            <p className="text-zinc-400 mb-6 font-medium">No problems reported yet. Be the first!</p>
            <Link 
              href="/submit"
              className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-200 text-sm font-bold tracking-wide hover:bg-zinc-700 transition-colors inline-block"
            >
              Submit a Problem
            </Link>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-zinc-900/20 border-t border-zinc-800/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight uppercase">HOW IT WORKS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "REPORT",
                desc: "Identify an issue in your locality and submit it with details, location, and photos.",
                icon: "📝"
              },
              {
                step: "02",
                title: "DISCUSS",
                desc: "Engage with the community. Upvote important problems and share solutions.",
                icon: "💬"
              },
              {
                step: "03",
                title: "RESOLVE",
                desc: "Track the progress as authorities and community members work towards a fix.",
                icon: "✅"
              }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 group-hover:from-emerald-500/20 group-hover:to-cyan-500/10 transition-all">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-wide text-zinc-100">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
