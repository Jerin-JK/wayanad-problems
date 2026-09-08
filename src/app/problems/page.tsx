"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProblemCard from "@/components/ProblemCard";

function ProblemsContent() {
  const searchParams = useSearchParams();
  
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [category, setCategory] = useState(searchParams?.get("category") || "All");
  const [status, setStatus] = useState(searchParams?.get("status") || "All");
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        category: category !== "All" ? category : "",
        status: status !== "All" ? status : "",
        sort: sort.toLowerCase(),
        page: page.toString(),
      });
      
      const res = await fetch(`/api/problems?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setProblems(data.problems || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
      // Fallback for development without API
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [search, category, status, sort, page]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4">
            <span className="text-zinc-100">ALL </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PROBLEMS</span>
          </h1>
          <p className="text-zinc-400 font-medium text-lg">Browse and filter issues reported across the district.</p>
        </div>

        {/* Filters */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 mb-10 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search problems..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-medium"
            />
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-300 font-medium focus:outline-none focus:border-cyan-500/50 appearance-none min-w-[140px]"
            >
              <option>All</option>
              <option>Infrastructure</option>
              <option>Environment</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Agriculture</option>
              <option>Livelihood</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
            

            
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-300 font-medium focus:outline-none focus:border-cyan-500/50 appearance-none min-w-[140px]"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Upvoted</option>
            </select>
          </div>
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-[250px] flex flex-col gap-4 animate-pulse">
                <div className="flex gap-2 mb-2">
                  <div className="h-6 w-20 bg-zinc-800/80 rounded-full" />
                  <div className="h-6 w-24 bg-zinc-800/80 rounded-full" />
                </div>
                <div className="h-8 w-3/4 bg-zinc-800/80 rounded-lg" />
                <div className="h-16 w-full bg-zinc-800/50 rounded-lg" />
                <div className="mt-auto h-4 w-1/3 bg-zinc-800/80 rounded" />
              </div>
            ))}
          </div>
        ) : problems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl backdrop-blur-sm">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-zinc-200 mb-2">No results found</h3>
            <p className="text-zinc-500 font-medium">No problems match your current filters. Try adjusting them.</p>
            <button 
              onClick={() => {
                setSearch(""); setCategory("All"); setStatus("All"); setSort("Newest");
              }}
              className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && problems.length > 0 && totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800 font-bold text-cyan-400">
              {page} <span className="text-zinc-500 font-medium mx-1">/</span> <span className="text-zinc-400">{totalPages}</span>
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProblemsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>}>
      <ProblemsContent />
    </Suspense>
  );
}
