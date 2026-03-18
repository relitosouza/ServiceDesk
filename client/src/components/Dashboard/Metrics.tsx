import React from 'react';
import { Mail, Clock, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const MetricCard = ({ title, value, change, isPositive, icon, iconBg, iconColor }: MetricCardProps) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <span className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'} px-2 py-1 rounded-full`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </span>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
  </div>
);

const Metrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Abertos" 
        value="24" 
        change="+5%" 
        isPositive={true} 
        icon={<Mail size={24} />} 
        iconBg="bg-amber-100 dark:bg-amber-900/30" 
        iconColor="text-amber-600 dark:text-amber-400" 
      />
      <MetricCard 
        title="Em Andamento" 
        value="12" 
        change="-2%" 
        isPositive={false} 
        icon={<Clock size={24} />} 
        iconBg="bg-blue-100 dark:bg-blue-900/30" 
        iconColor="text-blue-600 dark:text-blue-400" 
      />
      <MetricCard 
        title="Resolvidos" 
        value="158" 
        change="+12%" 
        isPositive={true} 
        icon={<CheckCircle size={24} />} 
        iconBg="bg-green-100 dark:bg-green-900/30" 
        iconColor="text-green-600 dark:text-green-400" 
      />
    </div>
  );
};

export default Metrics;
