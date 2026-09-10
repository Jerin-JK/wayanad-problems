'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateProblemStatus, deleteProblem } from './actions';

export default function AdminProblemList({ initialProblems }: { initialProblems: any[] }) {
  const [problems, setProblems] = useState(initialProblems);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      await updateProblemStatus(id, newStatus);
      setProblems(problems.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      alert('Failed to update status');
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem? This cannot be undone.')) return;
    
    setLoadingId(id);
    try {
      await deleteProblem(id);
      setProblems(problems.filter(p => p.id !== id));
    } catch (error) {
      alert('Failed to delete problem');
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-900/50 text-zinc-400 text-xs uppercase tracking-wider">
            <th className="p-5 font-bold">Problem</th>
            <th className="p-5 font-bold">Category</th>
            <th className="p-5 font-bold">Status</th>
            <th className="p-5 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {problems.map((problem) => (
            <tr key={problem.id} className="hover:bg-zinc-800/20 transition-colors">
              <td className="p-5">
                <Link href={`/problems/${problem.id}`} className="block font-semibold text-zinc-200 hover:text-emerald-400 mb-1">
                  {problem.title}
                </Link>
                <div className="text-sm text-zinc-500">
                  {problem.location} • {new Date(problem.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="p-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300">
                  {problem.category}
                </span>
              </td>
              <td className="p-5">
                <select
                  value={problem.status}
                  onChange={(e) => handleStatusChange(problem.id, e.target.value)}
                  disabled={loadingId === problem.id}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                >
                  <option value="reported">Reported</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
              <td className="p-5 text-right">
                <button
                  onClick={() => handleDelete(problem.id)}
                  disabled={loadingId === problem.id}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50 text-sm font-semibold p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {problems.length === 0 && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-zinc-500">
                No problems reported yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
