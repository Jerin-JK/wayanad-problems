export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️', color: 'orange-500', description: 'Roads, bridges, public facilities' },
  { id: 'environment', name: 'Environment', icon: '🌿', color: 'emerald-500', description: 'Landslides, flooding, deforestation, wildlife' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'red-500', description: 'Hospital access, medical services' },
  { id: 'education', name: 'Education', icon: '📚', color: 'blue-500', description: 'School infrastructure, teacher shortage' },
  { id: 'agriculture', name: 'Agriculture', icon: '🌾', color: 'amber-500', description: 'Crop issues, market access, irrigation' },
  { id: 'livelihood', name: 'Livelihood', icon: '💼', color: 'violet-500', description: 'Employment, tourism, tribal welfare' },
  { id: 'utilities', name: 'Utilities', icon: '🔧', color: 'cyan-500', description: 'Water supply, electricity, internet' },
  { id: 'other', name: 'Other', icon: '➕', color: 'zinc-500', description: 'User-suggested categories' },
];

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export const statusConfig: Record<string, StatusConfig> = {
  reported: {
    label: 'Reported',
    color: 'red-500',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    description: 'Problem has been reported',
  },
  in_progress: {
    label: 'In Progress',
    color: 'amber-500',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    description: 'Work is currently ongoing',
  },
  resolved: {
    label: 'Resolved',
    color: 'emerald-500',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    description: 'Problem has been resolved',
  },
};

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function getStatusConfig(status: string): StatusConfig | undefined {
  return statusConfig[status.toLowerCase()];
}
