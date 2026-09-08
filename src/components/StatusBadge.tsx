interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  let styles = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
  let dotColor = 'bg-zinc-400';
  let label = 'Unknown';

  if (normalizedStatus === 'reported') {
    styles = 'bg-red-500/10 text-red-400 border-red-500/20';
    dotColor = 'bg-red-400';
    label = 'Reported';
  } else if (normalizedStatus === 'in_progress') {
    styles = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    dotColor = 'bg-amber-400';
    label = 'In Progress';
  } else if (normalizedStatus === 'resolved') {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    dotColor = 'bg-emerald-400';
    label = 'Resolved';
  }

  return (
    <span className={`inline-flex items-center border rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`}></span>
      {label}
    </span>
  );
}
