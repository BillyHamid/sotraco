import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
  subtitle?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color, subtitle }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-gray-600 mb-2">{title}</p>
            <h3 className="mb-1">{value}</h3>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="text-sm">
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">vs hier</span>
              </div>
            )}
          </div>
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
