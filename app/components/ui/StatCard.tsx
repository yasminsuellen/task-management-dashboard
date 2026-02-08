import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

export default function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} opacity-20 p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
