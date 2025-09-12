import React from 'react';
import { FileText, Video, Image, BookOpen } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Total Articles Generated',
      value: '1,247',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Total Videos Created',
      value: '89',
      icon: Video,
      color: 'text-purple-400'
    },
    {
      title: 'Total Images Generated',
      value: '678',
      icon: Image,
      color: 'text-emerald-400'
    },
    {
      title: 'Total Blogs Created',
      value: '324',
      icon: BookOpen,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all duration-200 hover:border-slate-600"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <h3 className="text-sm font-medium text-slate-300 mb-2">{stat.title}</h3>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;