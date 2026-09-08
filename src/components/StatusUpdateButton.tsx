'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUS_OPTIONS = [
  {
    value: 'reported',
    label: 'Reported',
    color: 'bg-red-500/10 border-red-500/30 text-red-400',
    hoverColor: 'hover:bg-red-500/20',
    dot: 'bg-red-500',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    hoverColor: 'hover:bg-yellow-500/20',
    dot: 'bg-yellow-500',
  },
  {
    value: 'resolved',
    label: 'Resolved',
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    hoverColor: 'hover:bg-emerald-500/20',
    dot: 'bg-emerald-500',
  },
];

export default function StatusUpdateButton({
  problemId,
  currentStatus,
}: {
  problemId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const current = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

  const updateStatus = async (newStatus: string) => {
    if (newStatus === status) { setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/problems/${problemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all ${current.color} ${current.hoverColor} disabled:opacity-50`}
      >
        <span className={`w-2 h-2 rounded-full ${current.dot} ${loading ? 'animate-pulse' : ''}`} />
        {loading ? 'Updating…' : current.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-20 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl overflow-hidden min-w-[160px]">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateStatus(opt.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors hover:bg-zinc-800 ${
                  opt.value === status ? 'text-zinc-100' : 'text-zinc-400'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${opt.dot}`} />
                {opt.label}
                {opt.value === status && (
                  <svg className="w-4 h-4 ml-auto text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
