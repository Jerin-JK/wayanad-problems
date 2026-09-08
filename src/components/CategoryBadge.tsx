interface CategoryBadgeProps {
  category: string;
}

const CATEGORY_STYLES: Record<string, { emoji: string, classes: string }> = {
  'Infrastructure': { emoji: '🏗️', classes: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  'Environment': { emoji: '🌿', classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'Healthcare': { emoji: '🏥', classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
  'Education': { emoji: '📚', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  'Agriculture': { emoji: '🌾', classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'Livelihood': { emoji: '💼', classes: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  'Utilities': { emoji: '🔧', classes: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  'Other': { emoji: '➕', classes: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = CATEGORY_STYLES[category] || CATEGORY_STYLES['Other'];

  return (
    <span className={`inline-flex items-center border rounded-full px-3 py-1 text-xs font-semibold ${config.classes}`}>
      <span className="mr-1.5">{config.emoji}</span>
      {category}
    </span>
  );
}
