// components/dashboard/StatCard.tsx
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  trend?: number; // percentual: +12.5 ou -3.2
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  loading?: boolean;
}

const colorConfig = {
  blue: {
    bg: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trendPositive: 'text-blue-600',
    trendNegative: 'text-blue-400',
  },
  green: {
    bg: 'from-emerald-500 to-green-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trendPositive: 'text-emerald-600',
    trendNegative: 'text-emerald-400',
  },
  orange: {
    bg: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trendPositive: 'text-amber-600',
    trendNegative: 'text-amber-400',
  },
  purple: {
    bg: 'from-purple-500 to-violet-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trendPositive: 'text-purple-600',
    trendNegative: 'text-purple-400',
  },
  red: {
    bg: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    trendPositive: 'text-rose-600',
    trendNegative: 'text-rose-400',
  },
};

export default function StatCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  color,
  loading = false
}: StatCardProps) {
  const colors = colorConfig[color];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? colors.trendPositive : colors.trendNegative}`}>
                {trend >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
      </div>
      
      {/* Gradient bar */}
      <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${colors.bg}`}
          style={{ width: trend ? `${Math.min(Math.abs(trend), 100)}%` : '100%' }}
        />
      </div>
    </div>
  );
}